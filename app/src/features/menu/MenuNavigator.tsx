import { useState } from "react";
import { useMenuManagement } from "./hooks/useMenuManagement";
import AddMenuItemScreen from "./screens/AddMenuItemScreen";
import MenuScreen from "./screens/MenuScreen";
import { ManagedMenuItem } from "./types/menu";

export default function MenuNavigator() {
	const [adding, setAdding] = useState(false);
	const [editingItem, setEditingItem] = useState<ManagedMenuItem | null>(
		null,
	);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const { existingCategories } = useMenuManagement();

	function closeForm() {
		setAdding(false);
		setEditingItem(null);
	}

	if (adding || editingItem) {
		return (
			<AddMenuItemScreen
				item={editingItem}
				existingCategories={existingCategories}
				onClose={closeForm}
				onSaved={() => {
					const message = editingItem
						? "Item updated successfully"
						: "Item saved successfully	";
					closeForm();
					setSuccessMessage(message);
				}}
			/>
		);
	}

	return (
		<MenuScreen
			onAddItem={() => {
				setSuccessMessage(null);
				setAdding(true);
			}}
			onEditItem={(item) => {
				setSuccessMessage(null);
				setEditingItem(item);
			}}
			successMessage={successMessage}
		/>
	);
}
