import { OrderApi, ApiOrderStatus } from "@/types/api/order";
import { getElapsedSeconds } from "@/utils";
import { Order, OrderFilter, OrderStatus } from "../types/order";

function mapStatus(status: ApiOrderStatus): OrderStatus {
	if (status === "pending") return "new";
	if (status === "preparing") return "preparing";
	if (status === "cancelled") return "cancelled";
	return "ready";
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
		items: (api.items ?? []).map((item) => ({
			id: item.id,
			quantity: item.quantity,
			name: item.menu_item_name ?? "Unknown item",
			note: item.notes ?? undefined,
			unitPrice: item.unit_price ?? 0,
			subtotal: item.subtotal ?? 0,
		})),
		createdAt: api.created_at,
		totalAmount: api.total_amount ?? 0,
	};
}

export function mapFilterToApiStatus(
	filter: OrderFilter,
): ApiOrderStatus | undefined {
	if (filter === "New") return "pending";
	if (filter === "Preparing") return "preparing";
	if (filter === "Ready") return "ready";
	if (filter === "Cancelled") return "cancelled";
	return undefined;
}
