import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchMenuApi } from "@/services/api/menu.api";
import { createOrderApi } from "@/services/api/order.api";
import { MenuItem } from "@/types/menu";
import { CartItem } from "../types/cart";
import { getCategoriesFromMenu, MapMenuItem } from "../utils/mapMenu";

export function useNewOrder() {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [cart, setCart] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const loadMenu = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const data = await fetchMenuApi(true);
			const mapped = data.map(MapMenuItem);

			setMenuItems(mapped);
			const cats = getCategoriesFromMenu(mapped);
			setCategories(cats);
			setSelectedCategory((prev) => prev || cats[0] || "");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load menu",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadMenu();
	}, [loadMenu]);

	const filteredItems = useMemo(
		() => menuItems.filter((item) => item.category === selectedCategory),
		[menuItems, selectedCategory],
	);

	const addToCart = (item: MenuItem) => {
		setSuccessMessage(null);
		setCart((prev) => {
			const existing = prev.find((c) => c.menuItemId === item.id);
			if (existing) {
				return prev.map((c) =>
					c.menuItemId === item.id
						? { ...c, quantity: c.quantity + 1 }
						: c,
				);
			}
			return [
				...prev,
				{
					menuItemId: item.id,
					name: item.name,
					price: item.price,
					quantity: 1,
				},
			];
		});
	};

	const cartCount = useMemo(
		() => cart.reduce((sum, item) => sum + item.quantity, 0),
		[cart],
	);

	const cartTotal = useMemo(
		() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
		[cart],
	);

	const submitOrder = async () => {
		if (cart.length === 0) return;

		try {
			setSubmitting(true);
			setError(null);

			await createOrderApi({
				table_id: null,
				customer_name: "Walk-in",
				items: cart.map((item) => ({
					menu_item_id: item.menuItemId,
					quantity: item.quantity,
				})),
			});

			setCart([]);
			setSuccessMessage("Order submitted successfully");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to submit order",
			);
		} finally {
			setSubmitting(false);
		}
	};

	return {
		categories,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
		loading,
		error,
		successMessage,
		cartCount,
		cartTotal,
		addToCart,
		submitOrder,
		submitting,
		refreshMenu: loadMenu,
	};
}
