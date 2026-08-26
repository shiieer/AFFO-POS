import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatRp } from "@/utils";
import { OrderLineItem } from "../types/order";

function ItemIcon() {
	return (
		<View className="h-10 w-10 items-center justify-center rounded-lg bg-brand-surface">
			<Ionicons name="cafe-outline" size={18} color="#6B7280" />
		</View>
	);
}

export default function OrderDetailItemsCard({
	items,
}: {
	items: OrderLineItem[];
}) {
	const count = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<View className="rounded-2xl border border-brand-border bg-white">
			<View className="flex-row items-center justify-between px-4 py-3">
				<Text>Items</Text>
				<Text>
					{count} Item{count !== 1 ? "s" : ""}
				</Text>
			</View>

			{items.map((item, index) => (
				<View
					key={item.id}
					className={`flex-row px-4 py-3 ${index < items.length - 1 ? "border-t border-brand-border" : ""}`}
				>
					<ItemIcon />

					<View className="ml-3 flex-1">
						<View className="flex-row items-start justify-between">
							<Text className="flex-1 pr-3 font-semibold text-brand-dark">
								{item.quantity}x {item.name}
							</Text>
							<Text className="font-semibold text-brand-dark">
								{formatRp(item.unitPrice)}
							</Text>
						</View>

						{item.note ? (
							<Text className="mt-1 text-xs text-brand-muted">
								{item.note}
							</Text>
						) : null}
					</View>
				</View>
			))}
		</View>
	);
}
