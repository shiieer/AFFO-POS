import { CreateUserPayload, UserApi } from "@/types/api/user";
import { api } from "./client";

export async function fetchMeApi() {
	const { data } = await api.get<UserApi>("/auth/me");
	return data;
}

export async function fetchUsersApi() {
	const { data } = await api.get<UserApi>("/users");
	return data;
}

export async function createUserApi(payload: CreateUserPayload) {
	const { data } = await api.post<UserApi>("/users", payload);
	return data;
}
