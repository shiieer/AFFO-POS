import { OrderApi, ApiOrderStatus } from "@/types/api/order";
import { Order, OrderStatus } from "../types/order";

function mapStatus(status: ApiOrderStatus): OrderStatus {
	if (status === "pending") return "new";
	if (status === "preparing") return "preparing";
	return "ready";
}

function getElapsedSeconds(createdAt: string) {
	const created = new Date(createdAt).getTime();
	return Math.max(0, Math.floor((Date.now() - created) / 1000));
}

export function mapOrder(api: OrderApi): Order {
	const elapsedSeconds = getElapsedSeconds(api.created_at);

	return {
		id: api.id,
		orderCode: api.table_name ?? `#ORD-${api.id}`,
		status: mapStatus(api.status),
		paymentStatus: api.is_paid ? "paid" : "unpaid",
		locationType: api.table_id ? "table" : "to-go",
		locationLabel: api.table_name ?? api.customer_name ?? "To-Go",
		elapsedSeconds,
		isUrgent: elapsedSeconds >= 300,
		accentColor: api.table_id ? "blue" : "teal",
		items: api.items.map((item) => ({
			id: item.id,
			quantity: item.quantity,
			name: item.menu_item_name ?? "Unknow item",
			note: item.notes ?? undefined,
		})),
	};
}

export function mapFilterToApiStatus(
	filter: "All" | "New" | "Preparing" | "Ready",
): ApiOrderStatus | undefined {
	if (filter === "New") return "pending";
	if (filter === "Preparing") return "preparing";
	if (filter === "Ready") return "ready";
	return undefined;
}
