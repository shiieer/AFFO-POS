import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
	visible: boolean;
	name: string;
	saving: boolean;
	onChangeName: (value: string) => void;
	onClose: () => void;
	onSubmit: () => void;
};

export default function AddTableModal({
	visible,
	name,
	saving,
	onChangeName,
	onClose,
	onSubmit,
}: Props) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-black/40 px-6">
				<View className="w-full rounded-2xl bg-white p-5">
					<Text className="mb-3 text-lg font-bold text-brand-dark">
						Add Table
					</Text>

					<TextInput
						value={name}
						onChangeText={onChangeName}
						placeholder="e.g. Table 1"
						placeholderTextColor="#9CA3AF"
						className="rounded-lg border border-brand-border px-3 py-3 text-base text-brand-dark"
					/>

					<View className="mt-4 flex-row gap-2">
						<Pressable
							onPress={onClose}
							className="flex-1 items-center rounded-lg border border-brand-border py-3"
						>
							<Text className="font-semibold text-brand-dark">
								Cancel
							</Text>
						</Pressable>
						<Pressable
							onPress={onSubmit}
							disabled={saving}
							className="flex-1 items-center rounded-lg bg-brand-dark py-3"
						>
							<Text className="font-semibold text-white">
								{saving ? "Saving..." : "Save"}
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}
