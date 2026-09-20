import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AvailabilityFilter } from "../types/menu";
import { useOrientationLayout } from "@/shared/hooks/useOrientationLayout";

const FILTER_LABEL: Record<AvailabilityFilter, string> = {
	all: "Filter",
	"in-stock": "In Stock",
	"out-of-stock": "Sold Out",
};

type Props = {
	availabilityFilter: AvailabilityFilter;
	onPressFilter: () => void;
	onAddItem?: () => void;
};

export default function MenuManagementHeader({
	availabilityFilter,
	onPressFilter,
	onAddItem,
}: Props) {
	const { isLandscape } = useOrientationLayout();
	const filtered = availabilityFilter !== "all";

	return (
		<View className="mb-1 flex-row items-center justify-between px-4 pt-4">
			<View className="flex-1 pr-3">
				<Text className="text-xl font-bold text-[#111C2D]">
					Menu Management
				</Text>
				<Text className="mt-0.5 text-xs text-[#3F4850]">
					Manage live item availability, recipes & pricing
				</Text>
			</View>
			<View className="flex-row items-center gap-2">
				<Pressable
					onPress={onPressFilter}
					className={`flex-row items-center gap-1.5 rounded-xl border bg-white px-3.5 py-1.5 shadow-sm ${
						filtered ? "border-[#0284C7]" : "border-[#BFC7D2]"
					}`}
				>
					<Ionicons name="options-outline" size={18} color="#0284C7" />
					<Text className="text-xs font-semibold text-[#111C2D]">
						{FILTER_LABEL[availabilityFilter]}
					</Text>
				</Pressable>
				{isLandscape && onAddItem ? (
					<Pressable
						onPress={onAddItem}
						className="flex-row items-center gap-1.5 rounded-xl bg-[#0284C7] px-3.5 py-1.5 shadow"
					>
						<Ionicons name="add" size={18} color="#FFFFFF" />
						<Text className="text-xs font-semibold text-white">
							New Item
						</Text>
					</Pressable>
				) : null}
			</View>
		</View>
	);
}
