import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TableApi } from "@/types/api/table";

type Props = {
	table: TableApi;
	onViewQr: () => void;
};

export default function TableCard({ table, onViewQr }: Props) {
	const active = table.is_active;

	return (
		<View className="mb-3 overflow-hidden rounded-2xl border border-brand-border bg-white">
			<View
				className={`h-1 ${active ? "bg-emerald-400" : "bg-red-300"}`}
			/>
			<View className="items-center px-4 py-5">
				<Ionicons
					name="tablet-landscape-outline"
					size={28}
					color="#374151"
				/>
				<Text className="mt-3 text-lg font-bold text-brand-dark">
					{table.name}
				</Text>
				<View
					className={`mt-2 rounded-md px-2 py-1 ${active ? "bg-emerald-100" : "bg-red-100"}`}
				>
					<Text
						className={`text-[10px] font-bold tracking-widest ${active ? "text-emerald-800" : "text-red-700"}`}
					>
						{active ? "ACTIVE" : "INACTIVE"}
					</Text>
				</View>
				<Pressable
					onPress={onViewQr}
					className="mt-4 w-full flex-row items-center justify-center gap-2 rounded-lg border border-brand-border py-2.5"
				>
					<Ionicons
						name="qr-code-outline"
						size={16}
						color="#111827"
					/>
					<Text className="text-sm font-semibold text-brand-dark">
						View QR
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
