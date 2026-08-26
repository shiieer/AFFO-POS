import { ScrollView, Text, Pressable, ActivityIndicator } from "react-native";
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
				title={isEditing ? "Edit Item" : "Add Item"}
				onClose={onClose}
			/>

			<ScrollView
				className="flex-1 bg-white"
				contentContainerClassName="px-4 py-5 pb-10"
				keyboardShouldPersistTaps="handled"
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
					placeholder="Rp 0"
					keyboardType="numeric"
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
					onValueChange={(value) => setField("isAvailable", value)}
				/>

				{error ? (
					<Text className="mt-3 text-center text-red-500">
						{error}
					</Text>
				) : null}

				<Pressable
					onPress={submit}
					disabled={saving}
					className="mt-6 items-center rounded-xl bg-brand-dark py-3.5"
				>
					{saving ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<Text className="font-semibold text-white">
							{isEditing ? "Save Changes" : "Save Item"}
						</Text>
					)}
				</Pressable>
			</ScrollView>
		</ScreenContainer>
	);
}
