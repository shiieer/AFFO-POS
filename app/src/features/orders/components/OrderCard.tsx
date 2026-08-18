import { View, Text } from "react-native";
import { Order } from "../types/order";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderTimerBadge from "./OrderTimerBadge";
import OrderItemList from "./OrderItemList";
import OrderActionButtons from "./OrderActionButtons";

type Props = {
	order: Order;
	onStartPreparing: (orderId: number) => void;
	onPrint: (orderId: number) => void;
	onMarkReady: (orderId: number) => void;
};

const ACCENT_COLORS = {
	teal: "bg-teal-400",
	blue: "bg-brand-blue",
} as const;

export default function OrderCard({
	order,
	onStartPreparing,
	onPrint,
	onMarkReady,
}: Props) {
	const showTimer = order.status !== "ready";

	return (
		<View className="bg-white rounded-2xl border border-brand-border overflow-hidden mb-4">
			{order.accentColor ? (
				<View className={`h-1 ${ACCENT_COLORS[order.accentColor]}`} />
			) : null}

			<View className="p-4">
				<View className="flex-row items-start justify-between mb-3">
					<View className="flex-1">
						<Text className="text-lg font-bold text-brand-dark">
							{order.orderCode}
						</Text>
						<Text className="text-sm text-brand-muted mt-0.5">
							{order.locationLabel}
						</Text>
					</View>

					<View className="items-end gap-2">
						<OrderStatusBadge status={order.paymentStatus} />

						{showTimer ? (
							<OrderTimerBadge
								elapsedSeconds={order.elapsedSeconds}
								isUrgent={order.isUrgent}
							/>
						) : null}
					</View>
				</View>

				<OrderItemList items={order.items} />

				<View className="mt-4">
					<OrderActionButtons
						status={order.status}
						onStartPreparing={() => onStartPreparing(order.id)}
						onPrint={() => onPrint(order.id)}
						onMarkReady={() => onMarkReady(order.id)}
					/>
				</View>
			</View>
		</View>
	);
}
