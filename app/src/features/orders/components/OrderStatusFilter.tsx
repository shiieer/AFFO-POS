import { ScrollView, Pressable, Text } from "react-native";
import { OrderFilter } from "../types/order";

type Props = {
	filters: OrderFilter[];
	selected: OrderFilter;
	onSelect: (filter: OrderFilter) => void;
};

export default function OrderStatusFilter({
	filters,
	selected,
	onSelect,
}: Props) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="flex-grow-0"
			contentContainerClassName="px-4 py-3 gap-2"
		>
			{filters.map((filter) => {
				const isActive = filter === selected;

				return (
					<Pressable
						key={filter}
						onPress={() => onSelect(filter)}
						className={`px-4 py-2 rounded-full border ${isActive ? "bg-brand-dark border-brand-dark" : "bg-white border-brand-border"}`}
					>
						<Text
							className={`text-sm fron-medium ${isActive ? "text-white" : "text-brand-dark"}`}
						>
							{filter}
						</Text>
					</Pressable>
				);
			})}
		</ScrollView>
	);
}
