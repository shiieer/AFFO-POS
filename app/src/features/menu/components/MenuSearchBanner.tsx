import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	value: string;
	onChangeText: (value: string) => void;
	activeCount: number;
	soldOutCount: number;
};

export default function MenuSearchBanner({
	value,
	onChangeText,
	activeCount,
	soldOutCount,
}: Props) {
	return (
		<View className="mx-4 mb-1 flex-row items-center gap-2 rounded-2xl border border-[#BFC7D2]/70 bg-white p-3 shadow-sm">
			<Ionicons name="search" size={20} color="#707881" />
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder="Search beverages, pastries, ingredients..."
				placeholderTextColor="#707881"
				className="flex-1 p-0 text-xs font-medium text-[#111C2D]"
			/>
			<View className="shrink-0 rounded-lg bg-[#57DFFE]/20 px-2.5 py-1">
				<Text className="text-[11px] font-bold text-brand-blue">
					{activeCount} Active • {soldOutCount} Sold Out
				</Text>
			</View>
		</View>
	);
}
