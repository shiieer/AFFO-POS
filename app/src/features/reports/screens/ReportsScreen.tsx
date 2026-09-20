import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import ScreenContainer from "@/shared/components/ScreenContainer";
import { ReportPeriod } from "@/types/api/report";
import { useState } from "react";
import { useSalesReport } from "../hooks/useSalesReport";
import { StatCardData } from "../types/reports";
import { formatRp } from "@/utils";
import ReportsHeader from "../components/ReportsHeader";
import PeriodFilterBar from "../components/PeriodFilterBar";
import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import TopItemList from "../components/TopItemList";

type Props = {
	onBack: () => void;
};

export default function ReportsScreen({ onBack }: Props) {
	const [period, setPeriod] = useState<ReportPeriod>("today");
	const {
		report,
		revenueChange,
		ordersChange,
		aovChange,
		comparisonLabel,
		loading,
		error,
	} = useSalesReport(period);

	const stats: StatCardData[] = report
		? [
				{
					label: "Total Revenue",
					value: formatRp(report.total_revenue),
					icon: "card-outline",
					trend: {
						value: revenueChange,
						label: comparisonLabel,
					},
				},
				{
					label: "Total Orders",
					value: String(report.total_orders),
					icon: "receipt-outline",
					trend: {
						value: ordersChange,
						label: comparisonLabel,
					},
				},
				{
					label: "Avg Order Value",
					value: formatRp(report.average_order_value),
					icon: "bag-handle-outline",
					trend: { value: aovChange, label: comparisonLabel },
				},
			]
		: [];

	return (
		<ScreenContainer showHeader={false}>
			<ReportsHeader onBack={onBack} />
			<PeriodFilterBar selected={period} onSelect={setPeriod} />

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#0284C7" />
				</View>
			) : error ? (
				<Text className="mt-10 px-6 text-center text-red-500">
					{error}
				</Text>
			) : (
				<ScrollView
					className="flex-1"
					contentContainerClassName="gap-4 px-4 pb-10 pt-4"
					showsVerticalScrollIndicator={false}
				>
					<View className="gap-3">
						{stats[0] ? (
							<StatCard stat={stats[0]} variant="hero" />
						) : null}
						{stats.slice(1).map((stat) => (
							<StatCard key={stat.label} stat={stat} />
						))}
					</View>

					<View className="rounded-2xl border border-[#cfdaf2] bg-white p-4">
						<View className="mb-4 flex-row items-center justify-between">
							<View className="flex-1 pr-2">
								<Text className="text-base font-bold text-slate-900">
									Sales Over Time
								</Text>
								<Text className="text-xs text-slate-400">
									Revenue by period
								</Text>
							</View>
							<View className="rounded-full border border-[#38bdf8]/40 bg-[#e0f2fe] px-3 py-1">
								<Text className="text-xs font-semibold text-[#0284c7]">
									Breakdown
								</Text>
							</View>
						</View>
						<BarChart data={report?.sales_over_time ?? []} />
					</View>

					<TopItemList
						items={(report?.top_items ?? []).map((item) => ({
							id: item.menu_item_id,
							name: item.name,
							sold: item.quantity_sold,
							revenue: item.revenue,
						}))}
					/>
				</ScrollView>
			)}
		</ScreenContainer>
	);
}
