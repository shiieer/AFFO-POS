import { ActivityIndicator, Text, View } from "react-native";
import ScreenContainer from "@/shared/components/ScreenContainer";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import CartBar from "../components/CartBar";
import { useNewOrder } from "../hooks/useNewOrder";

export default function NewOrderScreen() {
	const {
		categories,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
		loading,
		error,
		successMessage,
		cartCount,
		cartTotal,
		addToCart,
		submitOrder,
		submitting,
	} = useNewOrder();

	return (
		<ScreenContainer>
			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#2563EB" />
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-red-500 text-center">{error}</Text>
				</View>
			) : (
				<>
					<CategoryFilter
						categories={categories}
						selected={selectedCategory}
						onSelect={setSelectedCategory}
					/>

					{successMessage ? (
						<Text className="text-emerald-600 text-center py-2">
							{successMessage}
						</Text>
					) : null}

					<ProductGrid
						items={filteredItems}
						selectedItemId={null}
						onPressItem={addToCart}
					/>

					<CartBar
						itemCount={cartCount}
						total={cartTotal}
						submitting={submitting}
						onSubmit={submitOrder}
					/>
				</>
			)}
		</ScreenContainer>
	);
}
