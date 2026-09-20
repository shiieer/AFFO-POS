import { LoginRequest, TokenResponse } from "@/types/api/auth";
import { UserApi } from "@/types/api/user";
import { api } from "./client";

export async function loginApi(payload: LoginRequest) {
	const { data } = await api.post<TokenResponse>("/auth/login", payload);
	return data;
}

export async function fetchMeApi() {
	const { data } = await api.get<UserApi>("/auth/me");
	return data;
}

export async function fetchActiveStaffApi() {
	const { data } = await api.get<UserApi[]>("/auth/staff");
	return data;
}
