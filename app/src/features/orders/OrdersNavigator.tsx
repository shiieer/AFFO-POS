import { useState } from "react";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";

export default function OrdersNavigator() {
	const [orderId, setOrderId] = useState<number | null>(null);

	if (orderId == null) {
		return <OrderScreen onOpenOrder={setOrderId} />;
	}

	return (
		<OrderDetailScreen orderId={orderId} onBack={() => setOrderId(null)} />
	);
}
