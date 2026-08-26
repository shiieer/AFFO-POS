import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";
import ScreenContainer from "@/shared/components/ScreenContainer";
import OrderStatusFilter from "../components/OrderStatusFilter";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";

type Props = {
	onOpenOrder: (orderId: number) => void;
};

export default function OrderScreen({ onOpenOrder }: Props) {
	const {
		filters,
		selectedFilter,
		setSelectedFilter,
		orders,
		loading,
		refreshing,
		error,
		refresh,
		startPreparing,
		markReady,
		printOrder,
	} = useOrders();

	return (
		<ScreenContainer>
			<OrderStatusFilter
				filters={filters}
				selected={selectedFilter}
				onSelect={setSelectedFilter}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#2563EB" />
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-red-500 text-center">{error}</Text>
				</View>
			) : (
				<FlatList
					className="flex-1"
					data={orders}
					keyExtractor={(item) => String(item.id)}
					contentContainerClassName="px-4 pb-6"
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={refresh}
						/>
					}
					ListEmptyComponent={
						<Text className="text-center text-brand-muted mt-10">
							No orders found
						</Text>
					}
					renderItem={({ item }) => (
						<OrderCard
							order={item}
							onPress={() => onOpenOrder(item.id)}
							onStartPreparing={startPreparing}
							onPrint={printOrder}
							onMarkReady={markReady}
						/>
					)}
				/>
			)}
		</ScreenContainer>
	);
}
