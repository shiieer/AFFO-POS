import { Ionicons } from "@expo/vector-icons";

export type StatTrend = { value: number; label: string };

export type StatCardData = {
	label: string;
	value: string;
	icon: React.ComponentProps<typeof Ionicons>["name"];
	trend: StatTrend;
};

export type ChartPoint = {
	label: string;
	value: number;
};

export type TopSellingItem = {
	id: number;
	name: string;
	sold: number;
	revenue: number;
};
