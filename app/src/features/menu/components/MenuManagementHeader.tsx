import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AvailabilityFilter } from "../types/menu";

const FILTER_LABEL: Record<AvailabilityFilter, string> = {
	all: "Filter",
	"in-stock": "In Stock",
	"out-of-stock": "Out of Stock",
};

type Props = {
	availabilityFilter: AvailabilityFilter;
	onPressFilter: () => void;
};

export default function MenuManagementHeader({
	availabilityFilter,
	onPressFilter,
}: Props) {
	return (
		<View className="flex-row items-center justify-center border-b border-brand-border bg-white px-4 py-3">
			<Text className="text-xl font-bold text-brand-dark">
				Menu Management
			</Text>
			<Pressable
				onPress={onPressFilter}
				className="flex-row items-center gap-1 rounded-lg border border-brand-border px-3 py-1.5"
			>
				<Ionicons name="options-outline" size={14} color="#111827" />
				<Text className="text-sm text-brand-dark">
					{FILTER_LABEL[availabilityFilter]}
				</Text>
			</Pressable>
		</View>
	);
}
