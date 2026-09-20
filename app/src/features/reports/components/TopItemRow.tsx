import { View, Text } from "react-native";
import { TopSellingItem } from "../types/reports";
import { formatRp } from "@/utils";

type Props = {
	item: TopSellingItem;
	rank: number;
};

export default function TopItemRow({ item, rank }: Props) {
	const isFirst = rank === 1;

	return (
		<View className="flex-row items-center justify-between rounded-xl border border-slate-100 bg-white p-2.5">
			<View className="flex-row items-center gap-3">
				<View
					className={`h-7 w-7 items-center justify-center rounded-lg ${
						isFirst ? "bg-[#0284c7]" : "bg-[#e0f2fe]"
					}`}
				>
					<Text
						className={`text-xs font-bold ${
							isFirst ? "text-white" : "text-[#0284c7]"
						}`}
					>
						{rank}
					</Text>
				</View>
				<View>
					<Text className="text-xs font-semibold text-slate-800">
						{item.name}
					</Text>
					<Text className="text-[11px] text-slate-400">
						{item.sold} sold
					</Text>
				</View>
			</View>
			<Text className="text-xs font-bold text-[#0284c7]">
				{formatRp(item.revenue)}
			</Text>
		</View>
	);
}
