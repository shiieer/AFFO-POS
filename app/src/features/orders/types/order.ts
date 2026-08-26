export type OrderFilter = "All" | "New" | "Preparing" | "Ready" | "Cancelled";

export type OrderStatus = "new" | "preparing" | "ready" | "cancelled";

export type PaymentStatus = "paid" | "unpaid";

export type OrderLocationType = "table" | "to-go";

export type OrderLineItem = {
	id: number;
	quantity: number;
	name: string;
	note?: string;
	unitPrice: number;
	subtotal: number;
};

export type Order = {
	id: number;
	orderCode: string;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	locationType: OrderLocationType;
	locationLabel: string;
	elapsedSeconds: number;
	items: OrderLineItem[];
	createdAt: string;
	totalAmount: number;
	accentColor?: "teal" | "blue";
	isUrgent?: boolean;
};
