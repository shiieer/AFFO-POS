import { API_BASE_URL } from "@/constants/api";
import { MenuItemApi } from "@/types/api/menu";
import { MenuItem } from "@/types/menu";

export function MapMenuItem(api: MenuItemApi): MenuItem {
	const image = api.image_url
		? api.image_url.startsWith("http")
			? api.image_url
			: `${API_BASE_URL}${api.image_url}`
		: null;

	return {
		id: api.id,
		name: api.name,
		price: api.price,
		category: api.category,
		image,
		description: api.description,
	};
}

export function getCategoriesFromMenu(items: MenuItem[]) {
	return Array.from(new Set(items.map((item) => item.category)));
}
