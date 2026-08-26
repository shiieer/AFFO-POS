import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	onBack: () => void;
};

export default function StaffHeader({ onBack }: Props) {
	return (
		<View className="flex-row items-center border-b border-brand-border bg-white px-3 py-3">
			<Pressable onPress={onBack} className="p-1">
				<Ionicons name="chevron-back" size={24} color="#111827" />
			</Pressable>
			<Text className="mr-8 flex-1 text-center text-lg font-bold text-brand-dark">
				Staff Management
			</Text>
		</View>
	);
}
