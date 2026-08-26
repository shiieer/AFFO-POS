import { MenuItemApi } from "@/types/api/menu";
import { MenuItem } from "@/types/menu";
import { resolveImageUrl, uniqueStrings } from "@/utils";

export function MapMenuItem(api: MenuItemApi): MenuItem {
	return {
		id: api.id,
		name: api.name,
		price: api.price,
		category: api.category,
		image: resolveImageUrl(api.image_url),
		description: api.description,
	};
}

export function getCategoriesFromMenu(items: MenuItem[]) {
	return uniqueStrings(items.map((item) => item.category));
}
