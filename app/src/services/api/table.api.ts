import { CreateTablePayload, TableApi } from "@/types/api/table";
import { api } from "./client";

export async function fetchTablesApi() {
	const { data } = await api.get<TableApi[]>("/tables");
	return data;
}

export async function createTableApi(payload: CreateTablePayload) {
	const { data } = await api.post<TableApi>("/tables", payload);
	return data;
}
