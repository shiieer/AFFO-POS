import { UserRole } from "@/types/api/user";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
	visible: boolean;
	username: string;
	password: string;
	role: UserRole;
	saving: boolean;
	onChangeUsername: (value: string) => void;
	onChangePassword: (value: string) => void;
	onChangeRole: (value: UserRole) => void;
	onClose: () => void;
	onSubmit: () => void;
};

export default function AddStaffModal({
	visible,
	username,
	password,
	role,
	saving,
	onChangeUsername,
	onChangePassword,
	onChangeRole,
	onClose,
	onSubmit,
}: Props) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-black/40 px-6">
				<View className="w-full rounded-2xl bg-white p-5">
					<Text className="mb-3 text-lg font-bold text-brand-dark">
						Add Staff
					</Text>

					<TextInput
						value={username}
						onChangeText={onChangeUsername}
						placeholder="Username"
						autoCapitalize="none"
						placeholderTextColor="#9CA3AF"
						className="mb-3 rounded-lg border border-brand-border px-3 py-3 text-base text-brand-dark"
					/>

					<TextInput
						value={password}
						onChangeText={onChangePassword}
						placeholder="Password"
						secureTextEntry
						placeholderTextColor="#9CA3AF"
						className="mb-3 rounded-lg border border-brand-border px-3 py-3 text-base text-brand-dark"
					/>

					<View className="mb-4 flex-row gap-2">
						{(["staff", "admin"] as UserRole[]).map((option) => (
							<Pressable
								key={option}
								onPress={() => onChangeRole(option)}
								className={`flex-1 items-center rounded-lg py-2 ${
									role === option
										? "bg-brand-dark"
										: "border border-brand-border"
								}`}
							>
								<Text
									className={`font-semibold capitalize ${role === option ? "text-white" : "text-brand-dark"}`}
								>
									{option}
								</Text>
							</Pressable>
						))}
					</View>

					<View className="flex-row gap-2">
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
