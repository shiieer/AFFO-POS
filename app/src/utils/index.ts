import axios from "axios";
import { API_BASE_URL } from "@/constants/api";

export const ALL_ITEMS = "All Items";

export function formatRp(value: number) {
	return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatTime(iso: string) {
	return new Date(iso).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function formatWait(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

export function formatElapsedTime(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getElapsedSeconds(createdAt: string, now = Date.now()) {
	const created = new Date(createdAt).getTime();
	if (Number.isNaN(created)) return 0;
	return Math.max(0, Math.floor((now - created) / 1000));
}

export function resolveImageUrl(url: string | null | undefined) {
	if (!url) return null;
	if (url.startsWith("http")) return url;
	return `${API_BASE_URL}${url}`;
}

export function uniqueStrings(values: string[], sort = false) {
	const list = Array.from(new Set(values.filter(Boolean)));
	return sort ? list.sort() : list;
}

export function getErrorMessage(
	err: unknown,
	fallback = "Something went wrong",
) {
	if (axios.isAxiosError(err)) {
		const detail = err.response?.data?.detail;
		if (typeof detail === "string") return detail;
		return err.message;
	}
	if (err instanceof Error) return err.message;
	return fallback;
}
