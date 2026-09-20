import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { UserRole } from "@/types/api/user";

export type StoredStaff = {
	id?: number;
	username: string;
	role: UserRole;
};

const STAFF_KEY = "pos_recent_staff";

export async function saveRecentStaff(staff: StoredStaff) {
	try {
		const existing = await getRecentStaff();
		const filtered = existing.filter(
			(s) => s.username.toLowerCase() !== staff.username.toLowerCase()
		);
		const updated = [staff, ...filtered].slice(0, 8);
		const json = JSON.stringify(updated);

		if (Platform.OS === "web") {
			localStorage.setItem(STAFF_KEY, json);
			return;
		}
		await SecureStore.setItemAsync(STAFF_KEY, json);
	} catch {
	}
}

export async function getRecentStaff(): Promise<StoredStaff[]> {
	try {
		let raw: string | null = null;
		if (Platform.OS === "web") {
			raw = localStorage.getItem(STAFF_KEY);
		} else {
			raw = await SecureStore.getItemAsync(STAFF_KEY);
		}
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
