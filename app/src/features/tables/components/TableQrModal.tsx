import { Image, Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TableApi } from "@/types/api/table";

type Props = {
	table: TableApi | null;
	onClose: () => void;
};

export default function TableQrModal({ table, onClose }: Props) {
	return (
		<Modal visible={!!table} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-[#111C2D]/40 px-4">
				<View className="w-full max-w-sm overflow-hidden rounded-3xl border border-[#DEE8FF]/60 bg-white">
					<View className="flex-row items-center justify-between border-b border-[#DEE8FF]/60 bg-[#F9F9FF] px-5 py-4">
						<View className="flex-row items-center gap-2">
							<Ionicons
								name="qr-code-outline"
								size={20}
								color="#0284C7"
							/>
							<Text className="text-base font-bold text-[#111C2D]">
								{table?.name} QR
							</Text>
						</View>
						<Pressable
							onPress={onClose}
							className="h-8 w-8 items-center justify-center rounded-full"
						>
							<Ionicons name="close" size={20} color="#707881" />
						</Pressable>
					</View>

					<View className="items-center px-6 py-6">
						<View className="mb-4 h-48 w-48 items-center justify-center rounded-2xl border border-[#DEE8FF] bg-white p-2">
							{table?.qr_image_url ? (
								<Image
									source={{ uri: table.qr_image_url }}
									style={{ width: 176, height: 176 }}
									resizeMode="contain"
								/>
							) : (
								<Text className="text-center text-xs text-[#707881]">
									QR image not available
								</Text>
							)}
						</View>
						<Text className="max-w-[220px] text-center text-xs text-[#707881]">
							Scan to view menu and order to{" "}
							<Text className="font-bold text-[#111C2D]">
								{table?.name}
							</Text>
						</Text>
					</View>

					<View className="flex-row gap-3 border-t border-[#DEE8FF]/60 bg-[#F9F9FF] p-4">
						<Pressable
							onPress={onClose}
							className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl border border-[#BFC7D2]/60 py-2.5"
						>
							<Ionicons name="print-outline" size={18} color="#111C2D" />
							<Text className="text-xs font-bold text-[#111C2D]">
								Print
							</Text>
						</Pressable>
						<Pressable
							onPress={onClose}
							className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#0284C7] py-2.5"
						>
							<Ionicons name="download-outline" size={18} color="#FFFFFF" />
							<Text className="text-xs font-bold text-white">
								Download
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}
