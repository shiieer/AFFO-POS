import { Platform } from "react-native";

const DEFAULT_HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";

const FALLBACK_URL = `http://${DEFAULT_HOST}:8000`;

export const API_BASE_URL = process.env.API_URL ?? FALLBACK_URL;

export const DEV_LOGIN = {
	username: process.env.DEV_USERNAME ?? "admin",
	password: process.env.DEV_USERNAME ?? "admin123",
};
