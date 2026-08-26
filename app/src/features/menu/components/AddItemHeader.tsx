import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	title: string;
	onClose: () => void;
};

export default function AddItemHeader({ title, onClose }: Props) {
	return (
		<View className="flex-row items-center border-b border-brand-border bg-white px-3 py-3">
			<Pressable onPress={onClose} className="p-1">
				<Ionicons name="close" size={24} color="#111827" />
			</Pressable>
			<Text className="mr-8 flex-1 text-center text-lg font-bold text-brand-dark">
				{title}
			</Text>
		</View>
	);
}
