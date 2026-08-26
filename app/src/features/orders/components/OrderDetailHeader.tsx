import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Order } from "../types/order";
import OrderStatusBadge from "./OrderStatusBadge";
import KitchenStatusBadge from "./KitchenStatusBadge";

type Props = {
	order: Order;
	onBack: () => void;
};

export default function OrderDetailHeader({ order, onBack }: Props) {
	return (
		<View className="flex-row items-center bg-white px-3 py-3 border-b border-brand-border justify-between">
			<View className="flex-row items-center">
				<Pressable onPress={onBack} className="p-1 mr-1">
					<Ionicons name="chevron-back" size={24} color="#111827" />
				</Pressable>

				<Text className="text-lg font-bold text-brand-dark mr-2">
					Order #{order.id}
				</Text>
			</View>

			<View className="flex-row items-center gap-2">
				<OrderStatusBadge status={order.paymentStatus} />
				<KitchenStatusBadge status={order.status} />
			</View>
		</View>
	);
}
