import { View, Text } from "react-native";
import { OrderStatus } from "../types/order";

const STYLES: Record<
	OrderStatus,
	{ label: string; wrap: string; text: string }
> = {
	new: {
		label: "NEW",
		wrap: "bg-amber-50",
		text: "text-amber-700",
	},
	preparing: {
		label: "IN PROGRESS",
		wrap: "bg-blue-50",
		text: "text-blue-700",
	},
	ready: {
		label: "READY",
		wrap: "bg-emerald-50",
		text: "text-emerald-700",
	},
	cancelled: {
		label: "CANCELLED",
		wrap: "bg-red-50",
		text: "text-red-600",
	},
};

export default function KitchenStatusBadge({
	status,
}: {
	status: OrderStatus;
}) {
	const style = STYLES[status];

	return (
		<View className={`rounded px-2 py-1 ${style.wrap}`}>
			<Text
				className={`text-[10px] font-bold tracking-wide ${style.text}`}
			>
				{style.label}
			</Text>
		</View>
	);
}
