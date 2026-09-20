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
		<View className="mb-2 flex-row flex-wrap items-center gap-2 border-b border-[#DEE8FF]/70 px-4 pb-4 pt-5">
			{pills.map((pill) => {
				const isActive = pill.key === filter;
				return (
					<Pressable
						key={pill.key}
						onPress={() => onSelect(pill.key)}
						className={`rounded-full px-4 py-1.5 ${
							isActive
								? "bg-[#006194] shadow-sm shadow-[#006194]/20"
								: "border border-[#BFC7D2]/60 bg-white"
						}`}
					>
						<Text
							className={`text-xs font-bold ${
								isActive ? "text-white" : "font-semibold text-[#3F4850]"
							}`}
						>
							{pill.label} ({pill.count})
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}
