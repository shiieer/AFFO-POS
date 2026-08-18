import { useWindowDimensions } from "react-native";

export function useOrientationLayout() {
	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	return { width, height, isLandscape };
}
