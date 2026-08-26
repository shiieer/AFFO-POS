import { ReactNode } from "react";
import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";

type Props = TextInputProps & {
	label: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	labelRight?: ReactNode;
	error?: string;
};

export default function AuthTextField({
	label,
	leftIcon,
	rightIcon,
	labelRight,
	error,
	className,
	...inputProps
}: Props) {
	return (
		<View className="mb-5">
			<View className="mb-2 flex-row items-center justify-between">
				<Text className="text-sm text-brand-dark">{label}</Text>
				{labelRight}
			</View>

			<View
				className={`flex-row items-center rounded-lg border bg-white px-3 py-3 ${error ? "border-red-50" : "border-brand-border"}`}
			>
				{leftIcon ? <View className="mr-2">{leftIcon}</View> : null}

				<TextInput
					{...inputProps}
					className={`flex-1 text-base text-brand-dark ${className ?? ""}`}
					placeholderTextColor="#9CA3AF"
				/>

				{rightIcon ? <View className="ml-2">{rightIcon}</View> : null}
			</View>

			{error ? (
				<Text className="mt-1 text-xs text-red-500">{error}</Text>
			) : null}
		</View>
	);
}
