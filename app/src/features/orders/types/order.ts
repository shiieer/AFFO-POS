export type OrderFilter = "All" | "New" | "Preparing" | "Ready";

export type OrderStatus = "new" | "preparing" | "ready";

export type PaymentStatus = "paid" | "unpaid";

export type OrderLocationType = "table" | "to-go";

export type OrderLineItem = {
	id: number;
	quantity: number;
	name: string;
	note?: string;
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
	accentColor?: "teal" | "blue";
	isUrgent?: boolean;
};
