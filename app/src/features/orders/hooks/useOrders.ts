import { useCallback, useEffect, useState } from "react";
import { ORDER_FILTERS } from "../constants/filters";
import { Order, OrderFilter } from "../types/order";
import { fetchOrdersApi, updateOrderStatusApi } from "@/services/api/order.api";
import { mapFilterToApiStatus, mapOrder } from "../utils/mapOrder";

export function useOrders() {
	const [selectedFilter, setSelectedFilter] = useState<OrderFilter>("All");
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadOrders = useCallback(
		async (isRefresh = false) => {
			try {
				if (isRefresh) setRefreshing(true);
				else setLoading(true);

				setError(null);

				const apiStatus = mapFilterToApiStatus(selectedFilter);
				const data = await fetchOrdersApi({
					status: apiStatus,
					active_only: selectedFilter === "All",
				});

				setOrders(data.map(mapOrder));
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load orders",
				);
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		},
		[selectedFilter],
	);

	useEffect(() => {
		loadOrders();
	}, [loadOrders]);

	const startPreparing = async (orderId: number) => {
		await updateOrderStatusApi(orderId, { status: "preparing" });
		await loadOrders(true);
	};

	const markReady = async (orderId: number) => {
		await updateOrderStatusApi(orderId, { status: "ready" });
		await loadOrders(true);
	};

	const printOrder = (orderId: number) => {
		console.log("Print order:", orderId);
	};

	return {
		filters: ORDER_FILTERS,
		selectedFilter,
		setSelectedFilter,
		orders,
		loading,
		refreshing,
		error,
		refresh: () => loadOrders(true),
		startPreparing,
		markReady,
		printOrder,
	};
}
