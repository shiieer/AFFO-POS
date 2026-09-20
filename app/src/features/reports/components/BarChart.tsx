import { Text, View } from "react-native";
import { formatRp } from "@/utils";
import { ChartPoint } from "../types/reports";

type Props = {
	data: ChartPoint[];
};

const BAR_MAX = 160;

export default function BarChart({ data }: Props) {
	if (data.length === 0) {
		return (
			<View className="h-48 items-center justify-center rounded-xl border border-dashed border-sky-200/70 bg-sky-50/50">
				<Text className="text-sm text-slate-400">
					No sales in this period
				</Text>
			</View>
		);
	}

	const max = Math.max(...data.map((d) => d.value), 1);

	return (
		<View className="rounded-xl border border-dashed border-sky-200/70 bg-sky-50/50 p-4 pt-8">
			<View className="h-48 flex-row items-end justify-between gap-2">
				{data.map((point, index) => {
					const isPeak = point.value === max && point.value > 0;
					const barHeight =
						point.value > 0
							? Math.max((point.value / max) * BAR_MAX, 8)
							: 4;

					return (
						<View
							key={`${point.label}-${index}`}
							className="flex-1 items-center justify-end"
						>
							{isPeak ? (
								<View className="mb-1 rounded-full border border-[#38bdf8]/40 bg-[#e0f2fe] px-2 py-0.5">
									<Text className="text-[10px] font-semibold text-[#0284c7]">
										{formatRp(point.value)}
									</Text>
								</View>
							) : null}
							<View
								className={`w-full rounded-t-lg ${
									isPeak ? "bg-[#0284c7]" : "bg-[#e0f2fe]"
								}`}
								style={{ height: barHeight }}
							/>
							<Text
								className={`mt-2 text-[10px] font-medium ${
									isPeak
										? "font-bold text-[#0284c7]"
										: "text-slate-400"
								}`}
								numberOfLines={1}
							>
								{point.label}
							</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
}
