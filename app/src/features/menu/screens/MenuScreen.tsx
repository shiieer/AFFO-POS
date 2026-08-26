import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMenuManagement } from "../hooks/useMenuManagement";
import ScreenContainer from "@/shared/components/ScreenContainer";
import MenuManagementHeader from "../components/MenuManagementHeader";
import MenuCategoryFilter from "../components/MenuCategoryFilter";
import MenuItemCard from "../components/MenuItemCard";
import { ManagedMenuItem } from "../types/menu";
import Toast from "@/shared/components/Toast";

type Props = {
	onAddItem: () => void;
	onEditItem: (item: ManagedMenuItem) => void;
	successMessage?: string | null;
};

export default function MenuScreen({
	onAddItem,
	onEditItem,
	successMessage,
}: Props) {
	const {
		items,
		categories,
		selectedCategory,
		setSelectedCategory,
		availabilityFilter,
		cycleAvailabilityFilter,
		loading,
		error,
		toggleAvailability,
	} = useMenuManagement();

	return (
		<ScreenContainer showHeader={false}>
			<MenuManagementHeader
				availabilityFilter={availabilityFilter}
				onPressFilter={cycleAvailabilityFilter}
			/>

			<MenuCategoryFilter
				categories={categories}
				selected={selectedCategory}
				onSelect={setSelectedCategory}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#2563EB" />
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-center text-red-500">{error}</Text>
				</View>
			) : (
				<View className="flex-1">
					<FlatList
						className="flex-1"
						data={items}
						keyExtractor={(item) => String(item.id)}
						contentContainerClassName="px-4 py-4 pb-24"
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<Text className="mt-10 text-center text-brand-muted">
								No menu items found
							</Text>
						}
						renderItem={({ item }) => (
							<MenuItemCard
								item={item}
								onPress={() => onEditItem(item)}
								onToggle={toggleAvailability}
							/>
						)}
					/>

					<Toast message={successMessage ?? null} type="success" />

					<Pressable
						onPress={onAddItem}
						className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark"
					>
						<Ionicons name="add" size={28} color="#FFFFFF" />
					</Pressable>
				</View>
			)}
		</ScreenContainer>
	);
}
