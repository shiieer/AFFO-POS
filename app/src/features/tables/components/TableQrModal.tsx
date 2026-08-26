import { Image, Modal, Pressable, Text, View } from "react-native";
import { TableApi } from "@/types/api/table";

type Props = {
	table: TableApi | null;
	onClose: () => void;
};

export default function TableQrModal({ table, onClose }: Props) {
	return (
		<Modal visible={!!table} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-black/40 px-6">
				<View className="w-full items-center rounded-2xl bg-white p-5">
					<Text className="mb-3 text-lg font-bold text-brand-dark">
						{table?.name} QR
					</Text>
					{table?.qr_image_url ? (
						<Image
							source={{ uri: table.qr_image_url }}
							style={{ width: 220, height: 220 }}
							resizeMode="contain"
						/>
					) : (
						<Text className="text-brand-muted">
							QR image not available
						</Text>
					)}
					<Pressable
						onPress={onClose}
						className="mt-4 w-full items-center rounded-lg bg-brand-dark py-3"
					>
						<Text className="font-semibold text-white">Close</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}
