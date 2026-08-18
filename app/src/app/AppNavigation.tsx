import { NavigationContainer } from "expo-router/react-navigation";
import { useOrientationLayout } from "@/shared/hooks/useOrientationLayout";
import SideRailNav from "@/navigation/SideRailNav";
import BottomTabNav from "@/navigation/BottomTabNav";

export default function AppNavigation() {
	const { isLandscape } = useOrientationLayout();

	return (
		<NavigationContainer>
			{isLandscape ? <SideRailNav /> : <BottomTabNav />}
		</NavigationContainer>
	);
}
