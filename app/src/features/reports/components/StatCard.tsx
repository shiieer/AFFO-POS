import { StatCardData } from "../types/reports";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	stat: StatCardData;
	variant?: "hero" | "plain";
};

function TrendPill({
	isDown,
	label,
	onHero,
}: {
	isDown: boolean;
	label: string;
	onHero?: boolean;
}) {
	if (onHero) {
		return (
			<View
				className={`flex-row items-center gap-1 self-start rounded-full px-2 py-0.5 ${
					isDown ? "bg-white/15" : "bg-[#dcfce7]"
				}`}
			>
				<Ionicons
					name={isDown ? "trending-down" : "trending-up"}
					size={13}
					color={isDown ? "#FFFFFF" : "#15803d"}
				/>
				<Text
					className={`text-xs font-medium ${
						isDown ? "text-white" : "text-[#15803d]"
					}`}
				>
					{label}
				</Text>
			</View>
		);
	}

	return (
		<View
			className={`flex-row items-center gap-1 self-start rounded-full px-2 py-0.5 ${
				isDown ? "bg-rose-50" : "bg-[#dcfce7]"
			}`}
		>
			<Ionicons
				name={isDown ? "trending-down" : "trending-up"}
				size={13}
				color={isDown ? "#BE123C" : "#15803d"}
			/>
			<Text
				className={`text-xs font-medium ${
					isDown ? "text-rose-700" : "text-[#15803d]"
				}`}
			>
				{label}
			</Text>
		</View>
	);
}

export default function StatCard({ stat, variant = "plain" }: Props) {
	const isDown = stat.trend.value < 0;
	const sign = stat.trend.value > 0 ? "+" : "";
	const trendLabel = `${sign}${stat.trend.value}% ${stat.trend.label}`;

	if (variant === "hero") {
		return (
			<View
				className="rounded-2xl bg-[#0284c7] p-4 shadow-md"
				style={{
					shadowColor: "#0284c7",
					shadowOpacity: 0.25,
					shadowRadius: 10,
					shadowOffset: { width: 0, height: 4 },
				}}
			>
				<View className="mb-3 flex-row items-start justify-between">
					<Text className="text-xs font-semibold uppercase tracking-wider text-white/80">
						{stat.label}
					</Text>
					<Ionicons name={stat.icon} size={18} color="#FFFFFF" />
				</View>
				<Text className="mb-2 text-3xl font-extrabold tracking-tight text-white">
					{stat.value}
				</Text>
				<TrendPill isDown={isDown} label={trendLabel} onHero />
			</View>
		);
	}

	return (
		<View className="rounded-2xl border border-[#cfdaf2] bg-white p-4">
			<View className="mb-3 flex-row items-start justify-between">
				<Text className="text-xs font-semibold uppercase tracking-wider text-slate-500">
					{stat.label}
				</Text>
				<Ionicons name={stat.icon} size={18} color="#0284c7" />
			</View>
			<Text className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
				{stat.value}
			</Text>
			<TrendPill isDown={isDown} label={trendLabel} />
		</View>
	);
}
