import { ActivityIndicator, Text, View } from "react-native";
import ScreenContainer from "@/shared/components/ScreenContainer";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import CartPanel from "../components/CartPanel";
import CartBar from "../components/CartBar";
import { useNewOrder } from "../hooks/useNewOrder";
import { MenuItem } from "@/types/menu";
import Toast from "@/shared/components/Toast";
import { useOrientationLayout } from "@/shared/hooks/useOrientationLayout";

export default function NewOrderScreen() {
	const {
		categories,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
		loading,
		error,
		successMessage,
		cart,
		cartCount,
		cartTotal,
		menuItems,
		getItemQuantity,
		increaseItem,
		decreaseItem,
		clearCart,
		submitOrder,
		submitting,
	} = useNewOrder();
	const { isLandscape, width } = useOrientationLayout();

	const handleDecreaseFromMenu = (item: MenuItem) => {
		decreaseItem(item.id);
	};

	const railWidth = isLandscape ? 96 : 0;
	const sidebarWidth = isLandscape ? 320 : 0;
	const catalogWidth = Math.max(280, width - railWidth - sidebarWidth);

	const catalog = (
		<View className="min-w-0 flex-1">
			<CategoryFilter
				categories={categories}
				selected={selectedCategory}
				onSelect={setSelectedCategory}
			/>
			<ProductGrid
				items={filteredItems}
				categoryLabel={selectedCategory}
				contentWidth={catalogWidth}
				bottomInset={isLandscape ? 24 : cartCount > 0 ? 8 : 24}
				getItemQuantity={getItemQuantity}
				onIncreaseItem={increaseItem}
				onDecreaseItem={handleDecreaseFromMenu}
			/>
		</View>
	);

	const cartActions = {
		onIncrease: (id: number) => {
			const item = menuItems.find((menuItem) => menuItem.id === id);
			if (item) increaseItem(item);
		},
		onDecrease: decreaseItem,
		onClear: clearCart,
		onSubmit: submitOrder,
	};

	return (
		<ScreenContainer>
			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#0284C7" />
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-center text-red-500">{error}</Text>
				</View>
			) : (
				<>
					{isLandscape ? (
						<View className="flex-1 flex-row">
							{catalog}
							<CartPanel
								items={cart}
								total={cartTotal}
								submitting={submitting}
								{...cartActions}
							/>
						</View>
					) : (
						<>
							{catalog}
							<CartBar
								itemCount={cartCount}
								total={cartTotal}
								submitting={submitting}
								onSubmit={submitOrder}
							/>
						</>
					)}

					<Toast message={successMessage} type="success" />
				</>
			)}
		</ScreenContainer>
	);
}
