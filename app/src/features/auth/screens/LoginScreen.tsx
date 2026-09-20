import { Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLogin } from "../hooks/useLogin";
import AuthHeader from "../components/AuthHeader";
import AuthTextField from "../components/AuthTextField";
import PasswordField from "../components/PasswordField";
import AuthButton from "../components/AuthButton";

type Props = {
	onAuthenticated: () => void;
};

export default function LoginScreen({ onAuthenticated }: Props) {
	const {
		form,
		loading,
		error,
		fieldErrors,
		setField,
		resetPassword,
		submit,
	} = useLogin(onAuthenticated);

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerClassName="flex-grow justify-center mx-6 my-10"
					keyboardShouldPersistTaps="handled"
				>
					<AuthHeader />

					<AuthTextField
						label="Username"
						value={form.username}
						onChangeText={(value) => setField("username", value)}
						placeholder="Enter Username"
						autoCapitalize="none"
						autoCorrect={false}
						error={fieldErrors.username}
						leftIcon={
							<Ionicons
								name="id-card-outline"
								size={18}
								color="#9CA3AF"
							/>
						}
					/>

					<PasswordField
						value={form.password}
						onChangeText={(value) => setField("password", value)}
						error={fieldErrors.password}
						onResetPress={resetPassword}
					/>

					{error ? (
						<Text className="mb-3 text-center text-sm text-red-500">
							{error}
						</Text>
					) : null}

					<AuthButton loading={loading} onPress={submit} />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
