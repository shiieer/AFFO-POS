import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "@/shared/components/ScreenContainer";
import { useAddMenuItem } from "../hooks/useAddMenuItem";
import AddItemHeader from "../components/AddItemHeader";
import PhotoPickerField from "../components/PhotoPickerField";
import FormTextField from "../components/FormTextField";
import CategoryPicker from "../components/CategoryPicker";
import AvailabilityRow from "../components/AvailabilityRow";
import { ManagedMenuItem } from "../types/menu";

type Props = {
	item?: ManagedMenuItem | null;
	existingCategories: string[];
	onClose: () => void;
	onSaved: () => void;
};

export default function AddMenuItemScreen({
	item,
	existingCategories,
	onClose,
	onSaved,
}: Props) {
	const {
		form,
		categories,
		saving,
		error,
		fieldErrors,
		isEditing,
		setField,
		selectCategory,
		submit,
	} = useAddMenuItem(existingCategories, onSaved, item);

	return (
		<ScreenContainer showHeader={false}>
			<AddItemHeader
				title={isEditing ? "Edit Item" : "Add New Item"}
				onClose={onClose}
			/>

			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					className="flex-1"
					contentContainerClassName="gap-5 px-5 pb-28 pt-5"
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<PhotoPickerField
						imageUri={form.imageUri}
						onChange={(uri) => setField("imageUri", uri)}
					/>

					<FormTextField
						label="Item Name"
						placeholder="e.g. Vanilla Latte"
						value={form.name}
						onChangeText={(value) => setField("name", value)}
						error={fieldErrors.name}
					/>

					<FormTextField
						label="Price"
						placeholder="0.00"
						keyboardType="numeric"
						prefix="Rp"
						value={form.price}
						onChangeText={(value) => setField("price", value)}
						error={fieldErrors.price}
					/>

					<CategoryPicker
						categories={categories}
						selected={form.category}
						onSelect={selectCategory}
						error={fieldErrors.category}
					/>

					<FormTextField
						label="Description"
						placeholder="Enter item description..."
						multiline
						value={form.description}
						onChangeText={(value) => setField("description", value)}
					/>

					<AvailabilityRow
						value={form.isAvailable}
						onValueChange={(value) =>
							setField("isAvailable", value)
						}
					/>

					{error ? (
						<Text className="text-center text-red-500">{error}</Text>
					) : null}
				</ScrollView>

				<View className="border-t border-sky-100 bg-white/90 p-4">
					<Pressable
						onPress={submit}
						disabled={saving}
						className="h-[52px] flex-row items-center justify-center gap-2 rounded-2xl bg-[#0284C7]"
						style={{
							shadowColor: "#0284C7",
							shadowOpacity: 0.25,
							shadowRadius: 12,
							shadowOffset: { width: 0, height: 6 },
							elevation: 4,
						}}
					>
						{saving ? (
							<ActivityIndicator color="#FFFFFF" />
						) : (
							<>
								<Ionicons
									name="checkmark"
									size={22}
									color="#FFFFFF"
								/>
								<Text className="text-base font-bold text-white">
									{isEditing ? "Save Changes" : "Save Item"}
								</Text>
							</>
						)}
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</ScreenContainer>
	);
}
