import { useWindowDimensions } from "react-native";
import { GRID } from "@/constants/layout";

export function useGridColumns() {
	const { width } = useWindowDimensions();

	const numColumns = width >= 900 ? 4 : width >= 700 ? 3 : 2;
	const cardWidth =
		(width - GRID.padding * 2 - GRID.gap * (numColumns - 1)) / numColumns;

	return { width, numColumns, cardWidth };
}
