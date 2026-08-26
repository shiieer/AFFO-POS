import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import AppNavigation from "@/app/AppNavigation";
import { LoginScreen, useBootstrapAuth } from "@/features/auth";

export default function App() {
	const { ready, authenticated, refreshAuth } = useBootstrapAuth();

	return (
		<SafeAreaProvider>
			{!ready ? (
				<View className="flex-1 items-center justify-center bg-brand-surface">
					<ActivityIndicator size="large" color="#2563EB" />
				</View>
			) : !authenticated ? (
				<LoginScreen onAuthenticated={refreshAuth} />
			) : (
				<AppNavigation />
			)}
		</SafeAreaProvider>
	);
}
