import {
	CreateOrderPayload,
	OrderApi,
	ApiOrderStatus,
	UpdateOrderStatusPayload,
	UpdateOrderPaymentPayload,
} from "@/types/api/order";
import { api } from "./client";

export async function fetchOrdersApi(params?: {
	status?: ApiOrderStatus;
	active_only?: boolean;
}) {
	const { data } = await api.get<OrderApi[]>("/order", { params });
	return data;
}

export async function fetchOrderApi(orderId: number) {
	const { data } = await api.get<OrderApi>(`/order/${orderId}`);
	return data;
}

export async function createOrderApi(payload: CreateOrderPayload) {
	const { data } = await api.post<OrderApi>("/order", payload);
	return data;
}

export async function updateOrderStatusApi(
	orderId: number,
	payload: UpdateOrderStatusPayload,
) {
	const { data } = await api.patch<OrderApi>(
		`/order/${orderId}/status`,
		payload,
	);
	return data;
}

export async function updateOrderPaymentApi(
	orderId: number,
	payload: UpdateOrderPaymentPayload,
) {
	const { data } = await api.patch<OrderApi>(
		`/order/${orderId}/payment`,
		payload,
	);
	return data;
}
