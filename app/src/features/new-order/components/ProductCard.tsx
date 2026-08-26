import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { formatRp } from "@/utils";
import { MenuItem } from "@/types/menu";
import QuantityStepper from "./QuantityStepper";

type Props = {
	item: MenuItem;
	cardWidth: number;
	quantity: number;
	onIncrease: (item: MenuItem) => void;
	onDecrease: (item: MenuItem) => void;
};

export default function ProductCard({
	item,
	cardWidth,
	quantity,
	onIncrease,
	onDecrease,
}: Props) {
	return (
		<Pressable
			style={{ width: cardWidth }}
			onPress={() => onIncrease(item)}
			disabled={quantity > 0}
			className={`mb-4 overflow-hidden rounded-2xl border bg-white ${
				quantity > 0 ? "border-brand-blue" : "border-brand-border"
			}`}
		>
			<View className="h-28 items-center justify-center overflow-hidden bg-brand-surface">
				{item.image ? (
					<Image
						source={{ uri: item.image }}
						style={{ width: "100%", height: "100%" }}
						contentFit="cover"
						transition={200}
					/>
				) : (
					<Text className="text-xs text-brand-muted">No image</Text>
				)}
			</View>

			<View className="px-3 py-3">
				<Text className="text-base font-medium text-brand-dark">
					{item.name}
				</Text>
				<Text className="mt-1 text-sm text-brand-muted">
					{formatRp(item.price)}
				</Text>

				<View className="mt-3 items-end">
					{quantity > 0 && (
						<QuantityStepper
							quantity={quantity}
							onIncrease={() => onIncrease(item)}
							onDecrease={() => onDecrease(item)}
							size="sm"
						/>
					)}
				</View>
			</View>
		</Pressable>
	);
}
