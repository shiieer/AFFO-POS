import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = {
	label: string;
	error?: string;
};

export default function FormTextField({
	label,
	error,
	multiline,
	...inputProps
}: Props) {
	return (
		<View className="mb-5">
			<Text className="mb-2 text-sm text-brand-dark">{label}</Text>
			<TextInput
				{...inputProps}
				multiline={multiline}
				textAlignVertical={multiline ? "top" : "center"}
				placeholderTextColor="#9CA3AF"
				className={`rounded-lg border bg-white px-3 py-3 text-base text-brand-dark ${multiline ? "h-24" : ""} ${error ? "border-red-400" : "border-brand-border"}`}
			/>
			{error ? (
				<Text className="mt-1 text-xs text-red-500">{error}</Text>
			) : null}
		</View>
	);
}
