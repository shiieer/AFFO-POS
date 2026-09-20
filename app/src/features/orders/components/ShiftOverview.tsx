import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShiftMetrics } from "../types/order";

type Props = {
	metrics: ShiftMetrics;
};

function compactRp(value: number) {
	if (value >= 1_000_000) {
		return `Rp${(value / 1_000_000).toFixed(1)}jt`;
	}
	if (value >= 1_000) {
		return `Rp${(value / 1_000).toFixed(1)}k`;
	}
	return `Rp${Math.round(value)}`;
}

const cardClass =
	"flex-1 overflow-hidden rounded-2xl border border-sky-100/90 bg-white/90 p-3 dark:border-slate-800 dark:bg-slate-900/90";

export default function ShiftOverview({ metrics }: Props) {
	const avg = metrics.avgMinutes;
	const avgLabel = Number.isFinite(avg) ? avg.toFixed(1) : "0.0";
	const fast = avg > 0 && avg < 5;

	return (
		<View className="flex-row gap-2.5 px-4 pt-3">
			<View className={cardClass}>
				<Text className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
					In Queue
				</Text>
				<View className="mt-1 flex-row items-baseline gap-1">
					<Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
						{metrics.inQueue}
					</Text>
					<Text className="text-[10px] font-semibold text-sky-600 dark:text-sky-400">
						tik
					</Text>
				</View>
				<View className="mt-1 flex-row items-center">
					<Ionicons name="trending-up" size={13} color="#34D399" />
					<Text className="ml-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
						+{metrics.newCount} new
					</Text>
				</View>
			</View>

			<View className={cardClass}>
				<Text className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
					Avg Speed
				</Text>
				<View className="mt-1 flex-row items-baseline gap-1">
					<Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
						{avgLabel}
					</Text>
					<Text className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
						min
					</Text>
				</View>
				<View className="mt-1 flex-row items-center">
					<Ionicons name="flash" size={13} color="#38BDF8" />
					<Text className="ml-0.5 font-mono text-[10px] font-semibold text-sky-600 dark:text-sky-400">
						{fast ? "Hyperdrive" : "Steady"}
					</Text>
				</View>
			</View>

			<View className={cardClass}>
				<Text className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
					Shift Rev
				</Text>
				<View className="mt-1 flex-row items-baseline">
					<Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
						{compactRp(metrics.revenue)}
					</Text>
				</View>
				<View className="mt-1 flex-row items-center">
					<Ionicons
						name="checkmark-circle"
						size={13}
						color="#60A5FA"
					/>
					<Text className="ml-0.5 font-mono text-[10px] font-semibold text-blue-600 dark:text-blue-400">
						{metrics.paidRate}% met
					</Text>
				</View>
			</View>
		</View>
	);
}
