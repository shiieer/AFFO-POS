import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import AppNavigation from "@/app/AppNavigation";
import { LoginScreen, useBootstrapAuth } from "@/features/auth";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";

export default function App() {
	const { ready, authenticated, refreshAuth } = useBootstrapAuth();

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				{!ready ? (
					<View className="flex-1 items-center justify-center bg-brand-canvas dark:bg-slate-950">
						<ActivityIndicator size="large" color="#38BDF8" />
					</View>
				) : !authenticated ? (
					<LoginScreen onAuthenticated={refreshAuth} />
				) : (
					<AppNavigation />
				)}
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
