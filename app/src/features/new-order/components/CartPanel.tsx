import {
	View,
	Text,
	Pressable,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
	onEditDetail?: (item: CartItem) => void;
};

export default function CartPanel({
	items,
	total,
	submitting,
	onIncrease,
	onDecrease,
	onClear,
	onSubmit,
	onEditDetail,
}: Props) {
	const hasItems = items.length > 0;

	return (
		<View className="my-4 mr-4 w-80 shrink-0 rounded-2xl border border-slate-200/90 bg-white p-4">
			<View className="flex-row items-center justify-between border-b border-slate-100 pb-3">
				<View className="flex-row items-center gap-2">
					<Ionicons name="cart-outline" size={20} color="#0891B2" />
					<Text className="text-[15px] font-bold text-slate-900">
						Current Ticket
					</Text>
				</View>
				<Pressable onPress={onClear} disabled={!hasItems || submitting}>
					<Text
						className={`text-xs font-semibold ${hasItems ? "text-slate-400" : "text-slate-300"}`}
					>
						Clear
					</Text>
				</Pressable>
			</View>

			<ScrollView className="flex-1 py-3" showsVerticalScrollIndicator={false}>
				{hasItems ? (
					<View className="gap-2.5">
						{items.map((item) => (
							<CartItemRow
								key={item.menuItemId}
								item={item}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								onEditDetail={onEditDetail}
							/>
						))}
					</View>
				) : (
					<View className="h-48 items-center justify-center">
						<View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-slate-50">
							<Ionicons name="receipt-outline" size={24} color="#CBD5E1" />
						</View>
						<Text className="text-xs font-medium text-slate-500">
							Ticket is empty
						</Text>
						<Text className="text-[11px] text-slate-400">
							Select drinks on the left to add
						</Text>
					</View>
				)}
			</ScrollView>

			<View className="border-t border-slate-100 pt-3">
				<View className="mb-2 flex-row justify-between">
					<Text className="text-xs text-slate-500">Subtotal</Text>
					<Text className="text-xs font-bold text-slate-700">
						{formatRp(total)}
					</Text>
				</View>
				<View className="mb-3 flex-row items-center justify-between">
					<Text className="text-[16px] font-extrabold text-slate-900">
						Total
					</Text>
					<Text className="text-[16px] font-extrabold text-brand-blue">
						{formatRp(total)}
					</Text>
				</View>
				<Pressable
					onPress={onSubmit}
					disabled={!hasItems || submitting}
					className={`flex-row items-center justify-center gap-2 rounded-xl py-3 ${
						!hasItems || submitting ? "bg-brand-blue/40" : "bg-brand-blue"
					}`}
					style={
						hasItems
							? {
									shadowColor: "#0284C7",
									shadowOpacity: 0.28,
									shadowRadius: 8,
									shadowOffset: { width: 0, height: 2 },
								}
							: undefined
					}
				>
					{submitting ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<>
							<Ionicons name="card-outline" size={18} color="#FFFFFF" />
							<Text className="text-sm font-bold text-white">Create Order</Text>
						</>
					)}
				</Pressable>
			</View>
		</View>
	);
}
