import { Pressable, Text, View } from "react-native";

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
	const compact = size === "sm";

	return (
		<View className="flex-row items-center rounded-lg border border-slate-200 bg-white">
			<Pressable
				onPress={onDecrease}
				disabled={quantity <= 0}
				className={`${compact ? "h-6 w-6" : "h-8 w-8"} items-center justify-center ${quantity <= 0 ? "opacity-40" : ""}`}
			>
				<Text className="text-xs font-bold text-slate-500">-</Text>
			</Pressable>
			<Text className="min-w-[18px] px-1.5 text-center text-xs font-bold text-slate-800">
				{quantity}
			</Text>
			<Pressable
				onPress={onIncrease}
				className={`${compact ? "h-6 w-6" : "h-8 w-8"} items-center justify-center`}
			>
				<Text className="text-xs font-bold text-slate-500">+</Text>
			</Pressable>
		</View>
	);
}
