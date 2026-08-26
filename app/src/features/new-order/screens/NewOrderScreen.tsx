import { ActivityIndicator, Text, View } from "react-native";
import ScreenContainer from "@/shared/components/ScreenContainer";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import CartPanel from "../components/CartPanel";
import { useNewOrder } from "../hooks/useNewOrder";
import { MenuItem } from "@/types/menu";
import Toast from "@/shared/components/Toast";

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
		cartTotal,
		menuItems,
		getItemQuantity,
		increaseItem,
		decreaseItem,
		clearCart,
		submitOrder,
		submitting,
	} = useNewOrder();

	const handleDecreaseFromMenu = (item: MenuItem) => {
		decreaseItem(item.id);
	};

	return (
		<ScreenContainer>
			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#2563EB" />
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-center text-red-500">{error}</Text>
				</View>
			) : (
				<>
					<CategoryFilter
						categories={categories}
						selected={selectedCategory}
						onSelect={setSelectedCategory}
					/>

					<ProductGrid
						items={filteredItems}
						getItemQuantity={getItemQuantity}
						onIncreaseItem={increaseItem}
						onDecreaseItem={handleDecreaseFromMenu}
					/>

					<CartPanel
						items={cart}
						total={cartTotal}
						submitting={submitting}
						onIncrease={(id) => {
							const item = menuItems.find((i) => i.id === id);
							if (item) increaseItem(item);
						}}
						onDecrease={decreaseItem}
						onClear={clearCart}
						onSubmit={submitOrder}
					/>

					<Toast message={successMessage} type="success"></Toast>
				</>
			)}
		</ScreenContainer>
	);
}
