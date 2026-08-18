import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppHeader() {
	return (
		<View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-brand-border">
			<MaterialCommunityIcons name="coffee" size={22} color="#111827" />

			<Text className="text-lg font-semibold text-brand-dark">
				KEDAI AFFO
			</Text>

			<Ionicons name="person-circle-outline" size={24} color="#111827" />
		</View>
	);
}
