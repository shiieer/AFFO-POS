import { Alert, ScrollView, Text, View } from "react-native";
import { clearToken } from "@/services/storage/tokenStorage";
import { MoreDestination, MoreItem } from "../types/more";
import { notifyUnauthorized } from "@/services/auth/session";
import MoreOption from "../components/MoreOption";
import ScreenContainer from "@/shared/components/ScreenContainer";
import MoreHeader from "../components/MoreHeader";

const ORGANIZATION: MoreItem[] = [
	{
		key: "staff",
		label: "Staff Management",
		icon: "people-outline",
		destination: "staff",
	},
	{
		key: "tables",
		label: "Table Management",
		icon: "grid-outline",
		destination: "tables",
	},
	{ key: "reports", label: "Reports", icon: "bar-chart-outline" },
];

const PERSONAL: MoreItem[] = [
	{
		key: "profile",
		label: "My Profile",
		icon: "person-outline",
		destination: "profile",
	},
	{
		key: "notifications",
		label: "Notification Settings",
		icon: "notifications-outline",
	},
];

const SYSTEM: MoreItem[] = [
	{ key: "settings", label: "App Settings", icon: "settings-outline" },
	{ key: "help", label: "Help & Support", icon: "help-circle-outline" },
	{ key: "logout", label: "Logout", icon: "log-out-outline", danger: true },
];

type Props = {
	onNavigate: (destination: MoreDestination) => void;
};

export default function MoreScreen({ onNavigate }: Props) {
	async function logout() {
		await clearToken();
		notifyUnauthorized();
	}

	function handlePress(item: MoreItem) {
		if (item.key === "logout") {
			Alert.alert("Logout", "Are you sure you want to logout?", [
				{ text: "Cancel", style: "cancel" },
				{ text: "Logout", style: "destructive", onPress: logout },
			]);
			return;
		}
		if (item.destination) onNavigate(item.destination);
	}

	function renderSection(title: string, items: MoreItem[]) {
		return (
			<View className="mb-6">
				<Text className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-brand-muted">
					{title}
				</Text>
				<View className="overflow-hidden rounded-2xl border border-brand-border bg-white">
					{items.map((item, index) => (
						<MoreOption
							key={item.key}
							item={item}
							isLast={index === items.length - 1}
							onPress={() => handlePress(item)}
						/>
					))}
				</View>
			</View>
		);
	}

	return (
		<ScreenContainer showHeader={false}>
			<MoreHeader />
			<ScrollView
				className="flex-1"
				contentContainerClassName="px-4 py-5 pb-10"
			>
				{renderSection("Oranization", ORGANIZATION)}
				{renderSection("Personal", PERSONAL)}
				{renderSection("System", SYSTEM)}
			</ScrollView>
		</ScreenContainer>
	);
}
