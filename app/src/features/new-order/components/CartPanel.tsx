import {
	View,
	Text,
	Pressable,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { formatRp } from "@/utils";
import { CartItem } from "../types/cart";
import CartItemRow from "./CartItemRow";

type Props = {
	items: CartItem[];
	total: number;
	submitting: boolean;
	onIncrease: (menuItemId: number) => void;
	onDecrease: (menuItemId: number) => void;
	onClear: () => void;
	onSubmit: () => void;
};

export default function CartPanel({
	items,
	total,
	submitting,
	onIncrease,
	onDecrease,
	onClear,
	onSubmit,
}: Props) {
	const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const hasItems = items.length > 0;

	return (
		<View className="max-h-72 border-t border-brand-border bg-white px-4 py-3">
			{hasItems ? (
				<ScrollView className="mb-3" showsVerticalScrollIndicator={false}>
					{items.map((item) => (
						<CartItemRow
							key={item.menuItemId}
							item={item}
							onIncrease={onIncrease}
							onDecrease={onDecrease}
						/>
					))}
				</ScrollView>
			) : (
				<Text className="mb-3 text-center text-brand-muted">
					No items yet
				</Text>
			)}

			<View className="mb-3 flex-row items-center justify-between">
				<Text className="text-brand-muted">
					{itemCount} item{itemCount !== 1 ? "s" : ""}
				</Text>
				<Text className="text-lg font-bold text-brand-dark">
					{formatRp(total)}
				</Text>
			</View>

			<View className="flex-row gap-3">
				<Pressable
					onPress={onClear}
					disabled={!hasItems || submitting}
					className={`flex-1 items-center rounded-xl border border-brand-border py-3 ${
						!hasItems || submitting ? "opacity-40" : "opacity-100"
					}`}
				>
					<Text className="font-semibold text-brand-dark">Clear</Text>
				</Pressable>

				<Pressable
					onPress={onSubmit}
					disabled={!hasItems || submitting}
					className={`flex-1 items-center rounded-xl py-3 ${
						!hasItems || submitting ? "bg-brand-blue/60" : "bg-brand-blue"
					}`}
				>
					{submitting ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<Text className="font-semibold text-white">Submit Order</Text>
					)}
				</Pressable>
			</View>
		</View>
	);
}