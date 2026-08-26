import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_ITEMS, AvailabilityFilter, ManagedMenuItem } from "../types/menu";
import { fetchMenuApi, updateMenuItemApi } from "@/services/api/menu.api";
import { getMenuCategories, mapManagedMenuItem } from "../utils/mapMenuItem";
import { getErrorMessage } from "@/utils";

export function useMenuManagement() {
	const [items, setItems] = useState<ManagedMenuItem[]>([]);
	const [selectedCategory, setSelectedCategory] = useState(ALL_ITEMS);
	const [availabilityFilter, setAvailabilityFilter] =
		useState<AvailabilityFilter>("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadMenu = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchMenuApi(false);
			setItems(Array.isArray(data) ? data.map(mapManagedMenuItem) : []);
		} catch (err) {
			setError(getErrorMessage(err, "Failed to load menu"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadMenu();
	}, [loadMenu]);

	const existingCategories = useMemo(() => getMenuCategories(items), [items]);

	const categories = useMemo(
		() => [ALL_ITEMS, ...existingCategories],
		[existingCategories],
	);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const matchCategory =
				selectedCategory === ALL_ITEMS ||
				item.category === selectedCategory;
			const matchStock =
				availabilityFilter === "all" ||
				(availabilityFilter === "in-stock" && item.isAvailable) ||
				(availabilityFilter === "out-of-stock" && !item.isAvailable);
			return matchCategory && matchStock;
		});
	}, [items, selectedCategory, availabilityFilter]);

	const cycleAvailabilityFilter = () => {
		setAvailabilityFilter((prev) =>
			prev === "all"
				? "in-stock"
				: prev === "in-stock"
					? "out-of-stock"
					: "all",
		);
	};

	const toggleAvailability = async (item: ManagedMenuItem) => {
		const next = !item.isAvailable;
		setItems((prev) =>
			prev.map((row) =>
				row.id === item.id ? { ...row, isAvailable: next } : row,
			),
		);
		try {
			await updateMenuItemApi(item.id, { is_available: next });
		} catch (err) {
			setItems((prev) =>
				prev.map((row) =>
					row.id === item.id
						? { ...row, isAvailable: item.isAvailable }
						: row,
				),
			);
			setError(getErrorMessage(err, "Failed to update items"));
		}
	};

	return {
		items: filteredItems,
		categories,
		existingCategories,
		selectedCategory,
		setSelectedCategory,
		availabilityFilter,
		cycleAvailabilityFilter,
		loading,
		error,
		refresh: loadMenu,
		toggleAvailability,
	};
}
