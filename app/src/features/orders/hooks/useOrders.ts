import { useCallback, useEffect, useMemo, useState } from "react";
import { ORDER_FILTERS } from "../constants/filters";
import { Order, OrderFilter, ShiftMetrics } from "../types/order";
import { fetchOrdersApi, updateOrderStatusApi } from "@/services/api/order.api";
import { getElapsedSeconds, getErrorMessage } from "@/utils";
import { countOrdersByFilter, filterOrders, mapOrder } from "../utils/mapOrder";

export function useOrders() {
	const [selectedFilter, setSelectedFilter] = useState<OrderFilter>("All");
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadOrders = useCallback(async (isRefresh = false) => {
		try {
			if (isRefresh) setRefreshing(true);
			else setLoading(true);

			setError(null);

			const data = await fetchOrdersApi({
				active_only: false,
			});

			const list = Array.isArray(data) ? data : [];
			setOrders(list.map(mapOrder));
		} catch (err) {
			setError(getErrorMessage(err, "Failed to load orders"));
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		loadOrders();
	}, [loadOrders]);

	const visibleOrders = useMemo(
		() => filterOrders(orders, selectedFilter),
		[orders, selectedFilter],
	);

	const counts = useMemo(() => countOrdersByFilter(orders), [orders]);

	const metrics = useMemo<ShiftMetrics>(() => {
		const active = orders.filter(
			(order) =>
				order.status !== "cancelled" && order.status !== "served",
		);
		const billed = orders.filter((order) => order.status !== "cancelled");
		const served = orders.filter((order) => order.status === "served");
		const paid = billed.filter((order) => order.paymentStatus === "paid");
		const speedSource = served.length ? served : active;
		const avgSeconds = speedSource.length
			? speedSource.reduce(
					(sum, order) => sum + getElapsedSeconds(order.createdAt),
					0,
				) / speedSource.length
			: 0;

		return {
			inQueue: active.length,
			newCount: active.filter((order) => order.status === "new").length,
			avgMinutes: avgSeconds / 60,
			revenue: paid.reduce((sum, order) => sum + order.totalAmount, 0),
			paidRate: billed.length
				? Math.round((paid.length / billed.length) * 100)
				: 0,
		};
	}, [orders]);

	const startPreparing = async (orderId: number) => {
		await updateOrderStatusApi(orderId, { status: "preparing" });
		await loadOrders(true);
	};

	const markReady = async (orderId: number) => {
		await updateOrderStatusApi(orderId, { status: "ready" });
		await loadOrders(true);
	};

	const markServed = async (orderId: number) => {
		await updateOrderStatusApi(orderId, { status: "served" });
		await loadOrders(true);
	};

	const printOrder = (orderId: number) => {
		console.log("Print order:", orderId);
	};

	return {
		filters: ORDER_FILTERS,
		selectedFilter,
		setSelectedFilter,
		counts,
		metrics,
		orders: visibleOrders,
		loading,
		refreshing,
		error,
		refresh: () => loadOrders(true),
		startPreparing,
		markReady,
		markServed,
		printOrder,
	};
}
