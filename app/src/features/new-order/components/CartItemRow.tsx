import { View, Text } from "react-native";
import { formatRp } from "@/utils";
import { CartItem } from "../types/cart";
import QuantityStepper from "./QuantityStepper";

type Props = {
	item: CartItem;
	onIncrease: (menuItemId: number) => void;
	onDecrease: (menuItemId: number) => void;
};

export default function CartItemRow({ item, onIncrease, onDecrease }: Props) {
	const subtotal = item.price * item.quantity;

	return (
		<View className="mb-3 flex-row items-center justify-between">
			<View className="mr-3 flex-1">
				<Text className="font-medium text-brand-dark">{item.name}</Text>
				<Text className="text-sm text-brand-muted">
					{formatRp(item.price)}
				</Text>
			</View>

			<View className="items-end">
				<QuantityStepper
					quantity={item.quantity}
					onIncrease={() => onIncrease(item.menuItemId)}
					onDecrease={() => onDecrease(item.menuItemId)}
					size="sm"
				/>
				<Text className="mt-1 text-sm font-semibold text-brand-dark">
					{formatRp(subtotal)}
				</Text>
			</View>
		</View>
	);
}
