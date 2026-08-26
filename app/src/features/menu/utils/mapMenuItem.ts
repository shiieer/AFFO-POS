import { MenuItemApi } from "@/types/api/menu";
import { resolveImageUrl, uniqueStrings } from "@/utils";
import { ManagedMenuItem } from "../types/menu";

export function mapManagedMenuItem(api: MenuItemApi): ManagedMenuItem {
	return {
		id: api.id,
		name: api.name,
		price: api.price,
		category: api.category,
		image: resolveImageUrl(api.image_url),
		description: api.description,
		isAvailable: api.is_available,
	};
}

export function getMenuCategories(items: ManagedMenuItem[]) {
	return uniqueStrings(
		items.map((item) => item.category),
		true,
	);
}