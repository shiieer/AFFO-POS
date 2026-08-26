import { FlatList } from "react-native";
import { GRID } from "@/constants/layout";
import { useGridColumns } from "@/shared/hooks/useGridColumns";
import { MenuItem } from "@/types/menu";
import ProductCard from "./ProductCard";

type Props = {
	items: MenuItem[];
	getItemQuantity: (menuItemId: number) => number;
	onIncreaseItem: (item: MenuItem) => void;
	onDecreaseItem: (item: MenuItem) => void;
};

export default function ProductGrid({
	items,
	getItemQuantity,
	onIncreaseItem,
	onDecreaseItem,
}: Props) {
	const { numColumns, cardWidth } = useGridColumns();

	return (
		<FlatList
			data={items}
			key={numColumns}
			numColumns={numColumns}
			keyExtractor={(item) => String(item.id)}
			contentContainerStyle={{
				paddingHorizontal: GRID.padding,
				paddingBottom: 24,
			}}
			columnWrapperStyle={numColumns > 1 ? { gap: GRID.gap } : undefined}
			renderItem={({ item }) => (
				<ProductCard
					item={item}
					cardWidth={cardWidth}
					quantity={getItemQuantity(item.id)}
					onIncrease={onIncreaseItem}
					onDecrease={onDecreaseItem}
				/>
			)}
		/>
	);
}
