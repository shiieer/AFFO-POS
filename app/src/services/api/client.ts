import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
import { getToken } from "../storage/tokenStorage";

export const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(async (config) => {
	const token = await getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
