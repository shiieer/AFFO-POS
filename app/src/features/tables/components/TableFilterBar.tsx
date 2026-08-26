import { Pressable, View, Text } from "react-native";
import { TableFilter } from "../hooks/useTables";

type Props = {
	filter: TableFilter;
	counts: { all: number; active: number; inActive: number };
	onSelect: (filter: TableFilter) => void;
};

export default function TableFilterBar({ filter, counts, onSelect }: Props) {
	const pills: { key: TableFilter; label: string; count: number }[] = [
		{ key: "all", label: "All", count: counts.all },
		{ key: "active", label: "Active", count: counts.active },
		{ key: "inactive", label: "Inactive", count: counts.inActive },
	];

	return (
		<View className="flex-row gap-2 px-4 py-4">
			{pills.map((pill) => {
				const isActive = pill.key === filter;
				return (
					<Pressable
						key={pill.key}
						onPress={() => onSelect(pill.key)}
						className={`rounded-full px-4 py-2 ${isActive ? "bg-brand-dark" : "border border-brand-border bg-white"}`}
					>
						<Text
							className={`text-sm font-medium ${isActive ? "text-white" : "text-brand-dark"}`}
						>
							{pill.label} ({pill.count})
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}
