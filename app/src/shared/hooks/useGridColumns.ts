import { useWindowDimensions } from "react-native";
import { GRID } from "@/constants/layout";

export function useGridColumns(contentWidth?: number) {
	const { width } = useWindowDimensions();
	const available = contentWidth ?? width;

	const numColumns = available >= 900 ? 4 : available >= 700 ? 3 : 2;
	const cardWidth =
		(available - GRID.padding * 2 - GRID.gap * (numColumns - 1)) /
		numColumns;

	return { width, numColumns, cardWidth };
}
