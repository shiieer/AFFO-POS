import { View, Text, Pressable, ActivityIndicator } from "react-native";

type Props = {
	itemCount: number;
	total: number;
	submitting: boolean;
	onSubmit: () => void;
};

export default function CartBar({
	itemCount,
	total,
	submitting,
	onSubmit,
}: Props) {
	return (
		<View className="px-4 py-3 bg-white border-t border-brand-border">
			<View className="flex-row items-center justify-between mb-3">
				<Text className="text-brand-muted">
					{itemCount} item{itemCount > 1 ? "s" : ""}
				</Text>
				<Text className="text-lg font-bold text-brand-dark">
					Rp {total.toLocaleString("id-ID")}
				</Text>
			</View>

			<Pressable
				onPress={onSubmit}
				disabled={submitting}
				className={`rounded-xl py-3 items-center ${submitting ? "bg-brand-blue/60" : "bg-brand-blue"}`}
			>
				{submitting ? (
					<ActivityIndicator color="#FFFFFF" />
				) : (
					<Text className="text-white font-semibold">
						Submit Order
					</Text>
				)}
			</Pressable>
		</View>
	);
}
