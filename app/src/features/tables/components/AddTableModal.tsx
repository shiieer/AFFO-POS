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
			<View className="flex-1 items-center justify-center bg-[#111C2D]/40 px-6">
				<View className="w-full rounded-3xl border border-[#DEE8FF]/60 bg-white p-5">
					<Text className="mb-3 text-lg font-bold text-[#111C2D]">
						Add Table
					</Text>

					<TextInput
						value={name}
						onChangeText={onChangeName}
						placeholder="e.g. Table 1"
						placeholderTextColor="#94A3B8"
						className="h-[52px] rounded-2xl border border-sky-100 bg-white px-4 text-sm font-medium text-slate-800"
					/>

					<View className="mt-4 flex-row gap-3">
						<Pressable
							onPress={onClose}
							className="flex-1 items-center rounded-xl border border-[#BFC7D2]/60 py-3"
						>
							<Text className="text-sm font-bold text-[#111C2D]">
								Cancel
							</Text>
						</Pressable>
						<Pressable
							onPress={onSubmit}
							disabled={saving}
							className="flex-1 items-center rounded-xl bg-[#006194] py-3"
						>
							<Text className="text-sm font-bold text-white">
								{saving ? "Saving..." : "Save"}
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}
