import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { MenuItem } from "@/types/menu";

type Props = {
	item: MenuItem;
	cardWidth: number;
	selected?: boolean;
	onPress: (item: MenuItem) => void;
};

export default function ProductCard({
	item,
	cardWidth,
	selected = false,
	onPress,
}: Props) {
	return (
		<Pressable
			onPress={() => onPress(item)}
			style={{ width: cardWidth }}
			className={`bg-white rounded-2xl border overflow-hidden mb-4 ${selected ? "border-brand-blue" : "border-brand-border"}`}
		>
			<View className="h-28 bg-brand-surface overflow-hidden items-center justify-center">
				{item.image ? (
					<Image
						source={{ uri: item.image }}
						style={{ width: "100%", height: "100%" }}
						contentFit="cover"
						transition={200}
					/>
				) : (
					<Text className="text-brand-muted text-xs">No image</Text>
				)}
			</View>

			<View className="px-3 py-3">
				<Text className="text-base font-medium text-brand-dark">
					{item.name}
				</Text>
				<Text className="text-sm text-brand-muted mt-1">
					{item.price.toFixed(2)}
				</Text>
			</View>
		</Pressable>
	);
}
