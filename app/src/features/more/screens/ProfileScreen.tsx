import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "@/shared/components/ScreenContainer";
import { useProfile } from "../hooks/useProfile";
import ProfileInfoRow from "../components/ProfileInfoRow";

type Props = {
	onBack: () => void;
};

export default function ProfileScreen({ onBack }: Props) {
	const { profile, loading, error } = useProfile();

	return (
		<ScreenContainer showHeader={false}>
			<View className="h-16 flex-row items-center justify-between border-b border-sky-100 bg-white/80 px-4">
				<Pressable
					onPress={onBack}
					className="h-10 w-10 items-center justify-center rounded-full"
					accessibilityLabel="Go back"
				>
					<Ionicons name="arrow-back" size={22} color="#334155" />
				</Pressable>
				<View className="items-center">
					<Text className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7]">
						Kedai Affo • POS
					</Text>
					<Text className="text-base font-bold text-slate-800">
						My Profile
					</Text>
				</View>
				<View className="h-10 w-10 items-center justify-center rounded-full">
					<Ionicons name="options-outline" size={20} color="#64748B" />
				</View>
			</View>

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#0284C7" />
				</View>
			) : error || !profile ? (
				<Text className="mt-10 px-6 text-center text-red-500">
					{error ?? "Profile not found"}
				</Text>
			) : (
				<ScrollView
					className="flex-1"
					contentContainerClassName="gap-4 px-4 py-5 pb-10"
					showsVerticalScrollIndicator={false}
				>
					<View className="items-center overflow-hidden rounded-3xl border border-sky-100/80 bg-white p-6">
						<View className="relative mb-3">
							<View className="h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-sky-200 bg-[#0284c7]">
								<Text className="text-3xl font-bold text-white">
									{profile.initials}
								</Text>
							</View>
							<View className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-xl bg-[#0284c7] shadow-md">
								<Ionicons
									name="camera"
									size={15}
									color="#FFFFFF"
								/>
							</View>
						</View>

						<Text className="text-xl font-bold tracking-tight text-slate-800">
							{profile.displayName}
						</Text>
						<View className="mt-2 flex-row flex-wrap items-center justify-center gap-2">
							<View className="flex-row items-center gap-1 rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1">
								<View className="h-1.5 w-1.5 rounded-full bg-sky-500" />
								<Text className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
									{profile.roleLabel}
								</Text>
							</View>
							<View className="rounded-full bg-slate-100 px-2.5 py-1">
								<Text className="text-[11px] font-semibold text-slate-500">
									@{profile.user.username}
								</Text>
							</View>
						</View>

						<View className="mt-5 w-full flex-row border-t border-slate-100 pt-4">
							<View className="flex-1 items-center">
								<Text className="text-sm font-bold text-slate-800">
									{profile.ordersToday}
								</Text>
								<Text className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
									Orders
								</Text>
							</View>
							<View className="flex-1 items-center border-x border-slate-100">
								<Text className="text-sm font-bold text-sky-600">
									{profile.user.role === "admin"
										? "Admin"
										: "Staff"}
								</Text>
								<Text className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
									Role
								</Text>
							</View>
							<View className="flex-1 items-center">
								<Text className="text-sm font-bold text-slate-800">
									{profile.tenureLabel}
								</Text>
								<Text className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
									Tenure
								</Text>
							</View>
						</View>
					</View>

					<View className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
						<View className="flex-row items-center justify-between border-b border-sky-100 bg-sky-50/70 px-5 py-3.5">
							<View className="flex-row items-center gap-2">
								<Ionicons
									name="id-card-outline"
									size={18}
									color="#0284C7"
								/>
								<Text className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
									Account Information
								</Text>
							</View>
							<View className="rounded-full bg-sky-100/70 px-2 py-0.5">
								<Text className="text-[10px] font-semibold text-[#0284c7]">
									Read only
								</Text>
							</View>
						</View>
						<View className="border-b border-slate-100">
							<ProfileInfoRow
								label="Username"
								value={`@${profile.user.username}`}
								trailing="edit"
							/>
						</View>
						<View className="border-b border-slate-100">
							<ProfileInfoRow
								label="Role"
								value={profile.roleLabel}
								trailing="edit"
							/>
						</View>
						<ProfileInfoRow
							label="Security Password"
							value="••••••••••"
							trailing="chevron"
						/>
					</View>

					<View className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
						<View className="flex-row items-center justify-between border-b border-sky-100 bg-sky-50/70 px-5 py-3.5">
							<View className="flex-row items-center gap-2">
								<Ionicons
									name="storefront-outline"
									size={18}
									color="#0284C7"
								/>
								<Text className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
									Work Details & Shift
								</Text>
							</View>
							<View className="flex-row items-center gap-1">
								<Ionicons
									name="lock-closed-outline"
									size={14}
									color="#94A3B8"
								/>
								<Text className="text-[11px] font-medium text-slate-400">
									Managed
								</Text>
							</View>
						</View>
						<View className="border-b border-slate-100">
							<ProfileInfoRow
								label="Employee ID"
								value={profile.employeeId}
								mono
								badge={{
									label: profile.user.is_active
										? "Active"
										: "Inactive",
									tone: profile.user.is_active
										? "active"
										: "muted",
								}}
							/>
						</View>
						<View className="border-b border-slate-100">
							<ProfileInfoRow
								label="Joined Date"
								value={profile.joinedLabel}
								hint={profile.tenureLabel}
							/>
						</View>
						<ProfileInfoRow
							label="Assigned Branch"
							value="Kedai Affo • POS"
							trailing="domain"
						/>
					</View>

					<Pressable className="mt-2 flex-row items-center justify-center gap-2 rounded-2xl bg-[#0284c7] py-3.5">
						<Ionicons
							name="checkmark-circle"
							size={20}
							color="#FFFFFF"
						/>
						<Text className="text-base font-semibold text-white">
							Save Changes
						</Text>
					</Pressable>
				</ScrollView>
			)}
		</ScreenContainer>
	);
}
