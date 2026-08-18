import { View, Text } from "react-native";
import { OrderLineItem } from "../types/order";

type Props = {
	items: OrderLineItem[];
};

export default function OrderItemList({ items }: Props) {
	return (
		<View className="gap-2">
			{items.map((item) => (
				<View key={item.id}>
					<Text className="text-sm text-brand-dark">
						{item.quantity}x {item.name}
					</Text>

					{item.note ? (
						<Text className="text-xs text-brand-muted mt-0.5">
							* {item.note}
						</Text>
					) : null}
				</View>
			))}
		</View>
	);
}
