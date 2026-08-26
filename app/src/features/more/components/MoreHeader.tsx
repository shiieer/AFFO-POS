import { View, Text } from "react-native";

export default function MoreHeader() {
	return (
		<View className="flex items-center border-b border-brand-border bg-white px-4 py-3">
			<Text className="text-lg font-bold text-brand-dark">More</Text>
		</View>
	);
}
