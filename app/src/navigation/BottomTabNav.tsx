import { createBottomTabNavigator } from "expo-router/js-tabs";
import { Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { NewOrderScreen } from "@/features/new-order";
import { OrderScreen } from "@/features/orders";
import { MenuScreen } from "@/features/menu";
import { ReportsScreen } from "@/features/reports";
import { MoreScreen } from "@/features/more";
import { RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNav() {
	return (
		<Tab.Navigator
			initialRouteName="NewOrder"
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: 72,
					paddingTop: 8,
					paddingBottom: 10,
					backgroundColor: "#FFFFFF",
					borderTopColor: "#E5E7EB",
				},
				tabBarActiveTintColor: "#2563EB",
				tabBarInactiveTintColor: "#6B7280",
				tabBarLabelStyle: {
					fontSize: 12,
					marginTop: 2,
				},
			}}
		>
			<Tab.Screen
				name="Orders"
				component={OrderScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="receipt"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="NewOrder"
				component={NewOrderScreen}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							className={`text-xs ${focused ? "text-brand-blue font-semibold" : "text-brand-muted"}`}
						>
							New Order
						</Text>
					),
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="add-circle-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Menu"
				component={MenuScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="book-outline"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Reports"
				component={ReportsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="bar-chart-outline"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="More"
				component={MoreScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="ellipsis-horizontal"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
