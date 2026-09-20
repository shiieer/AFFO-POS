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
import ShiftOverview from "../components/ShiftOverview";

type Props = {
	onOpenOrder: (orderId: number) => void;
};

export default function OrderScreen({ onOpenOrder }: Props) {
	const {
		filters,
		selectedFilter,
		setSelectedFilter,
		counts,
		metrics,
		orders,
		loading,
		refreshing,
		error,
		refresh,
		startPreparing,
		markReady,
		markServed,
		printOrder,
	} = useOrders();

	return (
		<ScreenContainer>
			<ShiftOverview metrics={metrics} />
			<OrderStatusFilter
				filters={filters}
				selected={selectedFilter}
				counts={counts}
				onSelect={setSelectedFilter}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#0284C7" />
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-center text-red-500">{error}</Text>
				</View>
			) : (
				<FlatList
					className="flex-1"
					data={orders}
					keyExtractor={(item) => String(item.id)}
					contentContainerClassName="px-4 pb-6 pt-3"
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={refresh}
							tintColor="#38BDF8"
						/>
					}
					ListEmptyComponent={
						<Text className="mt-10 text-center text-brand-slate dark:text-slate-400">
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
							onMarkServed={markServed}
						/>
					)}
				/>
			)}
		</ScreenContainer>
	);
}
