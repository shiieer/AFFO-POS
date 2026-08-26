export { ALL_ITEMS } from "@/utils";

export type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";

export type ManagedMenuItem = {
	id: number;
	name: string;
	price: number;
	category: string;
	image: string | null;
	description: string | null;
	isAvailable: boolean;
};

export type AddMenuItemForm = {
	name: string;
	price: string;
	category: string;
	description: string;
	imageUri: string | null;
	isAvailable: boolean;
};
