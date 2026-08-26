import { UserApi } from "@/types/api/user";
import { Text, View } from "react-native";
import AvailabilitySwitch from "@/features/menu/components/AvailabilitySwitch";

type Props = {
	user: UserApi;
};

function initials(username: string) {
	return username.slice(0, 2).toUpperCase();
}

export default function StaffCard({ user }: Props) {
	const isAdmin = user.role === "admin";

	return (
		<View className="mb-3 overflow-hidden rounded-2xl border border-brand-border bg-white">
			<View className="flex-row items-center p-4">
				<View className="h-12 w-12 items-center justify-center rounded-xl bg-brand-surface">
					<Text className="font-bold text-brand-dark">
						{initials(user.username)}
					</Text>
				</View>

				<View className="ml-3 flex-1">
					<Text className="text-base font-bold text-brand-dark">
						{user.username}
					</Text>
					<Text className="mt-0.5 text-sm text-brand-dark">
						{user.username}
					</Text>
				</View>

				<View
					className={`rounded-md px-2 py-1 ${isAdmin ? "bg-emerald-800" : "bg-gray-200"}`}
				>
					<Text
						className={`text-[10px] font-bold tracking-widest ${isAdmin ? "text-emerald-100" : "text-gray-700"}`}
					>
						{user.role.toUpperCase()}
					</Text>
				</View>
			</View>

			<View className="flex-row items-center justify-between border-t border-brand-border px-4 py-3">
				<Text className="text-sm text-brand-dark">
					{user.is_active ? "Active" : "Inactive"}
				</Text>
				<AvailabilitySwitch
					value={user.is_active}
					onValueChange={() => {}}
				/>
			</View>
		</View>
	);
}
