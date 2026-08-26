import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MoreItem } from "../types/more";

type Props = {
	item: MoreItem;
	isLast?: boolean;
	onPress: () => void;
};

export default function MoreRow({ item, isLast, onPress }: Props) {
	const color = item.danger ? "#DC2626" : "#111827";

	return (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center bg-white px-4 py-4 ${isLast ? "" : "border-b border-brand-border"}`}
		>
			<Ionicons name={item.icon} size={20} color={color} />
			<Text
				className={`ml-3 flex-1 text-base font-semibold ${item.danger ? "text-red-600" : "text-brand-dark"}`}
			>
				{item.label}
			</Text>
			<Ionicons
				name="chevron-forward"
				size={18}
				color={item.danger ? "#DC2626" : "#9CA3AF"}
			/>
		</Pressable>
	);
}
