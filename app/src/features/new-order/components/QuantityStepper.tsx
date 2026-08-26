import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
	size?: "sm" | "md";
};

export default function QuantityStepper({
	quantity,
	onIncrease,
	onDecrease,
	size = "md",
}: Props) {
	const buttonSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";
	const iconSize = size === "sm" ? 16 : 18;
	return (
		<View className="flex-row items-center gap-2 flex-shrink-0">
			<Pressable
				onPress={onDecrease}
				disabled={quantity <= 0}
				className={`${buttonSize} items-center justify-center rounded-full border border-brand-border bg-white ${quantity <= 0 ? "opacity-40" : "opacity-100"}`}
			>
				<Ionicons name="remove" size={iconSize} color="#111827" />
			</Pressable>

			<Text className="min-w-[20px] text-center font-semibold text-brand-dark">
				{quantity}
			</Text>
			<Pressable
				onPress={onIncrease}
				className={`${buttonSize} items-center justify-center rounded-full bg-brand-blue`}
			>
				<Ionicons name="add" size={iconSize} color="#FFFFFF" />
			</Pressable>
		</View>
	);
}
