import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MoreHeader() {
	return (
		<View className="h-14 flex-row items-center justify-between border-b border-slate-200/80 bg-white px-4">
			<View className="flex-row items-center gap-2">
				<Text className="text-lg font-extrabold text-slate-900">
					Settings
				</Text>
				<View className="rounded-full bg-sky-50 px-2 py-0.5">
					<Text className="text-[10px] font-bold uppercase tracking-wide text-sky-600">
						POS
					</Text>
				</View>
			</View>
			<View className="flex-row items-center gap-2">
				<Pressable
					className="h-9 w-9 items-center justify-center rounded-full bg-slate-50"
					accessibilityLabel="Search settings"
				>
					<Ionicons name="search" size={18} color="#64748B" />
				</Pressable>
				<View className="h-8 w-8 items-center justify-center rounded-full bg-sky-600">
					<Text className="text-xs font-bold text-white">KA</Text>
				</View>
			</View>
		</View>
	);
}
