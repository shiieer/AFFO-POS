import { useState } from "react";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthTextField from "./AuthTextField";

type Props = {
	value: string;
	onChangeText: (value: string) => void;
	error?: string;
	onResetPress?: () => void;
};

export default function PasswordField({
	value,
	onChangeText,
	error,
	onResetPress,
}: Props) {
	const [visible, setVisible] = useState(false);
	return (
		<AuthTextField
			label="Password"
			value={value}
			onChangeText={onChangeText}
			placeholder="Enter Password"
			secureTextEntry={!visible}
			autoCapitalize="none"
			autoCorrect={false}
			error={error}
			leftIcon={
				<Ionicons
					name="lock-closed-outline"
					size={18}
					color="#9CA3AF"
				/>
			}
			rightIcon={
				<Pressable
					onPress={() => setVisible((prev) => !prev)}
					hitSlop={8}
				>
					<Ionicons
						name={visible ? "eye-outline" : "eye-off-outline"}
						size={18}
						color="#9CA3AF"
					/>
				</Pressable>
			}
			labelRight={
				onResetPress ? (
					<Pressable onPress={onResetPress} hitSlop={8}>
						<Text className="text-sm text-brand-blue">Reset</Text>
					</Pressable>
				) : undefined
			}
		/>
	);
}
