import { View, Text } from "react-native";
import { TopSellingItem } from "../types/reports";
import TopItemRow from "./TopItemRow";

type Props = {
	items: TopSellingItem[];
};

export default function TopItemList({ items }: Props) {
	return (
		<View className="rounded-2xl border border-[#cfdaf2] bg-white p-4">
			<View className="mb-4 flex-row items-center justify-between">
				<View>
					<Text className="text-base font-bold text-slate-900">
						Top Selling Items
					</Text>
					<Text className="text-xs text-slate-400">
						By quantity & gross revenue
					</Text>
				</View>
				<View className="rounded-full border border-[#38bdf8]/40 bg-[#e0f2fe] px-3 py-1">
					<Text className="text-xs font-semibold text-[#0284c7]">
						Vol.
					</Text>
				</View>
			</View>
			<View className="gap-2">
				{items.length === 0 ? (
					<Text className="py-6 text-center text-sm text-slate-400">
						No items sold in this period
					</Text>
				) : (
					items.map((item, index) => (
						<TopItemRow
							key={item.id}
							item={item}
							rank={index + 1}
						/>
					))
				)}
			</View>
		</View>
	);
}
