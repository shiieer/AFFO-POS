import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReportPeriod } from "@/types/api/report";

type Props = {
	selected: ReportPeriod;
	onSelect: (period: ReportPeriod) => void;
};

const OPTIONS: { key: ReportPeriod; label: string }[] = [
	{ key: "today", label: "Today" },
	{ key: "week", label: "Last 7 Days" },
	{ key: "month", label: "Last 30 Days" },
];

export default function PeriodFilterBar({ selected, onSelect }: Props) {
	function cycle() {
		const index = OPTIONS.findIndex((option) => option.key === selected);
		onSelect(OPTIONS[(index + 1) % OPTIONS.length].key);
	}

	return (
		<View className="px-4 pt-4">
			<View className="mb-3 flex-row items-start justify-between gap-3">
				<View className="flex-1 pr-2">
					<Text className="text-2xl font-bold tracking-tight text-slate-900">
						Sales Reports
					</Text>
					<Text className="mt-0.5 text-xs text-slate-500">
						Real-time revenue, ticket size & product performance
					</Text>
				</View>
				<Pressable
					onPress={cycle}
					className="flex-row items-center gap-1.5 rounded-xl bg-[#0284c7] px-3.5 py-2 shadow-sm"
				>
					<Ionicons name="options-outline" size={14} color="#FFFFFF" />
					<Text className="text-xs font-semibold text-white">
						Filters
					</Text>
				</Pressable>
			</View>

			<View className="flex-row flex-wrap gap-2">
				{OPTIONS.map((option) => {
					const isActive = option.key === selected;
					return (
						<Pressable
							key={option.key}
							onPress={() => onSelect(option.key)}
							className={`rounded-full px-3 py-1 ${
								isActive
									? "border border-[#38bdf8]/40 bg-[#e0f2fe]"
									: "border border-[#cfdaf2] bg-white"
							}`}
						>
							<Text
								className={`text-xs font-semibold ${
									isActive
										? "text-[#0284c7]"
										: "text-slate-500"
								}`}
							>
								{option.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
