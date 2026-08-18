import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./AppHeader";

type Props = {
	children: ReactNode;
	showHeader?: boolean;
};

export default function ScreenContainer({
	children,
	showHeader = true,
}: Props) {
	return (
		<SafeAreaView className="flex-1 bg-brand-surface" edges={["top"]}>
			{showHeader && <AppHeader />}
			{children}
		</SafeAreaView>
	);
}
