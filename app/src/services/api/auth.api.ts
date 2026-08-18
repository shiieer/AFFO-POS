import { LoginRequest, TokenResponse } from "@/types/api/auth";
import { api } from "./client";

export async function loginApi(payload: LoginRequest) {
	const { data } = await api.post<TokenResponse>("/auth/login", payload);
	return data;
}
