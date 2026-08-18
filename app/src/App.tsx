import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View, Text } from "react-native";
import AppNavigation from "@/app/AppNavigation";
import { useBootstrapAuth } from "@/features/auth/hooks/useBootstrapAuth";

export default function App() {
	const { ready, error } = useBootstrapAuth();

	if (error) {
		return (
			<View className="flex-1 items-center justify-center bg-brand-surface px-6">
				<Text className="text-red-500 text-center">{error}</Text>
			</View>
		);
	}

	if (!ready) {
		return (
			<View className="flex-1 items-center justify-center bg-brand-surface">
				<ActivityIndicator size="large" color="#2563EB" />
			</View>
		);
	}

	return (
		<SafeAreaProvider>
			<AppNavigation />
		</SafeAreaProvider>
	);
}
