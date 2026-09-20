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
import { useOrientationLayout } from "@/shared/hooks/useOrientationLayout";

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
	const { isLandscape, width } = useOrientationLayout();

	const contentWidth = isLandscape ? Math.max(300, width - 200) : width;
	const gap = 14;
	const padding = 16;
	const numColumns = isLandscape
		? contentWidth >= 1200
			? 3
			: contentWidth >= 850
				? 3
				: 2
		: 1;
	const cardWidth = isLandscape
		? (contentWidth - padding * 2 - gap * (numColumns - 1)) / numColumns
		: undefined;

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
					key={isLandscape ? `grid-${numColumns}` : "list-1"}
					className="flex-1"
					data={orders}
					numColumns={numColumns}
					columnWrapperStyle={numColumns > 1 ? { gap } : undefined}
					keyExtractor={(item) => String(item.id)}
					contentContainerStyle={{
						paddingHorizontal: padding,
						paddingTop: 12,
						paddingBottom: 24,
					}}
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
							isLandscape={isLandscape}
							cardWidth={cardWidth}
						/>
					)}
				/>
			)}
		</ScreenContainer>
	);
}
