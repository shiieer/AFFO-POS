import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { StatusBar } from "react-native";
import { useColorScheme } from "nativewind";
import { ThemePreference } from "@/services/storage/themeStorage";

type ThemeContextValue = {
	preference: ThemePreference;
	isDark: boolean;
	setPreference: (value: ThemePreference) => void;
	toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const { setColorScheme } = useColorScheme();

	useEffect(() => {
		setColorScheme("light");
	}, [setColorScheme]);

	const setPreference = useCallback((_value: ThemePreference) => {}, []);
	const toggleDark = useCallback(() => {}, []);

	const value = useMemo(
		() => ({
			preference: "light" as const,
			isDark: false,
			setPreference,
			toggleDark,
		}),
		[setPreference, toggleDark],
	);

	return (
		<ThemeContext.Provider value={value}>
			<StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />
			{children}
		</ThemeContext.Provider>
	);
}

export function useAppTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useAppTheme must be used within ThemeProvider");
	}
	return ctx;
}
