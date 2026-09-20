import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	onAdd: () => void;
	total: number;
	active: number;
	inactive: number;
};

export default function StaffOverview({
	onAdd,
	total,
	active,
	inactive,
}: Props) {
	return (
		<View className="px-4 pt-5">
			<View className="mb-5 flex-row items-center justify-between gap-3">
				<View className="flex-1 pr-2">
					<Text className="text-xl font-bold tracking-tight text-slate-900">
						Staff Management
					</Text>
					<Text className="mt-0.5 text-xs text-slate-500">
						Manage team access, permissions, and roles.
					</Text>
				</View>
				<Pressable
					onPress={onAdd}
					className="flex-row items-center gap-1.5 rounded-xl bg-[#0284C7] px-4 py-2.5"
					style={{
						shadowColor: "#0284C7",
						shadowOpacity: 0.3,
						shadowRadius: 10,
						shadowOffset: { width: 0, height: 4 },
					}}
				>
					<Ionicons name="add" size={18} color="#FFFFFF" />
					<Text className="text-xs font-semibold text-white">
						Add Staff
					</Text>
				</Pressable>
			</View>

			<View className="flex-row gap-3">
				<View className="flex-1 rounded-2xl border border-sky-100 bg-white p-3">
					<Text className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
						Total Staff
					</Text>
					<Text className="mt-0.5 text-xl font-bold text-slate-900">
						{total}
					</Text>
				</View>
				<View className="flex-1 rounded-2xl border border-sky-100 bg-white p-3">
					<Text className="text-[11px] font-semibold uppercase tracking-wide text-sky-600">
						Active Now
					</Text>
					<Text className="mt-0.5 text-xl font-bold text-[#0284C7]">
						{active}
					</Text>
				</View>
				<View className="flex-1 rounded-2xl border border-sky-100 bg-white p-3">
					<Text className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
						Inactive
					</Text>
					<Text className="mt-0.5 text-xl font-bold text-slate-400">
						{inactive}
					</Text>
				</View>
			</View>
		</View>
	);
}
