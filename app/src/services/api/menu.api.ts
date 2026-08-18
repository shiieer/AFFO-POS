import { MenuItemApi } from "@/types/api/menu";
import { api } from "./client";

export async function fetchMenuApi(availableOnly = true) {
	const { data } = await api.get<MenuItemApi[]>("/menu", {
		params: { available_only: availableOnly },
	});
	return data;
}
