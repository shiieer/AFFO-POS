import { UserApi } from "@/types/api/user";
import { Text, View } from "react-native";
import AvailabilitySwitch from "@/features/menu/components/AvailabilitySwitch";

type Props = {
	user: UserApi;
};

function initials(username: string) {
	const parts = username.replace(/[._-]/g, " ").trim().split(/\s+/);
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
	}
	return username.slice(0, 2).toUpperCase();
}

function displayName(username: string) {
	return username
		.replace(/[._-]/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function StaffCard({ user }: Props) {
	const isAdmin = user.role === "admin";
	const active = user.is_active;

	return (
		<View
			className={`mb-3.5 rounded-2xl border bg-white p-4 ${
				active
					? "border-sky-100"
					: "border-slate-200/80 bg-white/80 opacity-85"
			}`}
			style={{
				shadowColor: "#0F172A",
				shadowOpacity: 0.04,
				shadowRadius: 16,
				shadowOffset: { width: 0, height: 6 },
			}}
		>
			<View className="flex-row items-center gap-3.5">
				<View
					className={`h-12 w-12 items-center justify-center rounded-2xl ${
						!active
							? "border border-slate-200 bg-slate-100"
							: isAdmin
								? "bg-[#0284C7]"
								: "border border-sky-200/80 bg-sky-100"
					}`}
				>
					<Text
						className={`text-sm font-bold ${
							!active
								? "text-slate-400"
								: isAdmin
									? "text-white"
									: "text-[#0284C7]"
						}`}
					>
						{initials(user.username)}
					</Text>
				</View>

				<View className="flex-1">
					<View className="flex-row flex-wrap items-center gap-2">
						<Text
							className={`text-base font-bold ${
								active ? "text-slate-900" : "text-slate-700"
							}`}
						>
							{displayName(user.username)}
						</Text>
						<View
							className={`flex-row items-center gap-1 rounded-full px-2 py-0.5 ${
								isAdmin && active
									? "border border-cyan-200/70 bg-cyan-50"
									: "border border-slate-200/70 bg-slate-100"
							}`}
						>
							{isAdmin && active ? (
								<View className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
							) : null}
							<Text
								className={`text-[11px] font-bold uppercase tracking-wide ${
									isAdmin && active
										? "text-cyan-700"
										: "font-semibold text-slate-600"
								}`}
							>
								{user.role}
							</Text>
						</View>
					</View>
					<Text className="mt-0.5 text-xs font-medium text-slate-400">
						@{user.username} • {isAdmin ? "Manager" : "Staff"}
					</Text>
				</View>
			</View>

			<View className="mt-3.5 flex-row items-center justify-between border-t border-slate-100 pt-3.5">
				<View className="flex-row items-center gap-1.5">
					<View
						className={`h-2 w-2 rounded-full ${
							active ? "bg-emerald-500" : "bg-slate-300"
						}`}
					/>
					<Text
						className={`text-xs ${
							active
								? "font-semibold text-slate-700"
								: "font-medium text-slate-400"
						}`}
					>
						{active ? "Active" : "Inactive"}
					</Text>
				</View>
				<AvailabilitySwitch
					value={active}
					onValueChange={() => {}}
				/>
			</View>
		</View>
	);
}
