import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const THEME_KEY = "pos_theme_preference";

export type ThemePreference = "light" | "dark" | "system";

function isPreference(value: string | null): value is ThemePreference {
	return value === "light" || value === "dark" || value === "system";
}

export async function saveThemePreference(value: ThemePreference) {
	if (Platform.OS === "web") {
		localStorage.setItem(THEME_KEY, value);
		return;
	}
	await SecureStore.setItemAsync(THEME_KEY, value);
}

export async function getThemePreference(): Promise<ThemePreference> {
	const value =
		Platform.OS === "web"
			? localStorage.getItem(THEME_KEY)
			: await SecureStore.getItemAsync(THEME_KEY);

	return isPreference(value) ? value : "system";
}
