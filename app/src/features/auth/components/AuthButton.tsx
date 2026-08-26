import { Pressable, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	loading?: boolean;
	disabled?: boolean;
	onPress: () => void;
};

export default function AuthButton({
	loading = false,
	disabled = false,
	onPress,
}: Props) {
	const isDisabled = disabled || loading;
	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			className={`mt-2 flex-row items-center justify-center rounded-lg bg-brand-dark py-4 ${isDisabled ? "opacity-60" : "opacity-100"}`}
		>
			{loading ? (
				<ActivityIndicator color="#FFFFFF" />
			) : (
				<>
					<Text className="text-base font-medium text-white">
						Login
					</Text>
					<Ionicons
						name="log-in-outline"
						size={18}
						color="#FFFFFF"
						style={{ marginLeft: 8 }}
					/>
				</>
			)}
		</Pressable>
	);
}
