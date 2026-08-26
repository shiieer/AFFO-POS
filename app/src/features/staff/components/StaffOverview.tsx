import { Pressable, View, Text } from "react-native";

type Props = {
	onAdd: () => void;
};

export default function StaffOverview({ onAdd }: Props) {
	return (
		<View className="flex-row items-start justify-between px-4 pt-4">
			<View className="flex-1 pr-3">
				<Text className="text-2xl font-bold text-brand-dark">
					Staff Management
				</Text>
				<Text className="mt-1 text-sm text-brand-muted">
					Manage team access and roles.
				</Text>
			</View>

			<Pressable
				onPress={onAdd}
				className="rounded-lg bg-brand-dark px-3 py-2"
			>
				<Text className="font-semibold text-white">Add Staff</Text>
			</Pressable>
		</View>
	);
}
