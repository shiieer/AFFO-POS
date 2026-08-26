export type MenuItemApi = {
	id: number;
	name: string;
	description: string | null;
	price: number;
	category: string;
	image_url: string | null;
	is_available: boolean;
	created_at: string;
	updated_at: string;
};

export type CreateMenuItemPayload = {
	name: string;
	description?: string | null;
	price: number;
	category: string;
	is_available: boolean;
};

export type UpdateMenuItemPayload = {
	name?: string;
	description?: string | null;
	price?: number;
	category?: string;
	is_available?: boolean;
};
