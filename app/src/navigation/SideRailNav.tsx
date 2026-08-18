import { JSX, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { OrderScreen } from "@/features/orders";
import { NewOrderScreen } from "@/features/new-order";
import { MenuScreen } from "@/features/menu";
import { ReportsScreen } from "@/features/reports";
import { MoreScreen } from "@/features/more";
import { SideTabKey } from "./types";

const TABS: {
	key: SideTabKey;
	label: string;
	icon: (active: boolean) => JSX.Element;
}[] = [
	{
		key: "Orders",
		label: "Orders",
		icon: () => (
			<MaterialCommunityIcons name="receipt" size={22} color="#111827" />
		),
	},
	{
		key: "NewOrder",
		label: "New Order",
		icon: (active) => (
			<Ionicons
				name="add-circle"
				size={24}
				color={active ? "#2563EB" : "#6B7280"}
			/>
		),
	},
	{
		key: "Menu",
		label: "Menu",
		icon: () => <Ionicons name="book-outline" size={22} color="#111827" />,
	},
	{
		key: "Reports",
		label: "Reports",
		icon: () => (
			<Ionicons name="bar-chart-outline" size={22} color="#111827" />
		),
	},
	{
		key: "More",
		label: "More",
		icon: () => (
			<Ionicons name="ellipsis-horizontal" size={22} color="#111827" />
		),
	},
];

const SCREEN_MAP = {
	Orders: OrderScreen,
	NewOrder: NewOrderScreen,
	Menu: MenuScreen,
	Reports: ReportsScreen,
	More: MoreScreen,
};

export default function SideRailNav() {
	const [activeTab, setActiveTab] = useState<SideTabKey>("NewOrder");
	const ActiveScreen = SCREEN_MAP[activeTab];

	return (
		<SafeAreaView className="flex-1 bg-brand-surface flex-row">
			<View className="w-24 bg-white border-r border-brand-border py-4 items-center gap-4">
				{TABS.map((tab) => {
					const isActive = tab.key === activeTab;

					return (
						<Pressable
							key={tab.key}
							onPress={() => setActiveTab(tab.key)}
							className={`items-center px-2 py-2 rounded-xl ${isActive ? "bg-blue-50" : ""}`}
						>
							{tab.icon(isActive)}
							<Text
								className={`text-[10px] mt-1 text-center ${isActive ? "text-brand-blue font-semibold" : "text-brand-muted"}`}
							>
								{tab.label}
							</Text>
						</Pressable>
					);
				})}
			</View>

			<View className="flex-1">
				<ActiveScreen />
			</View>
		</SafeAreaView>
	);
}
