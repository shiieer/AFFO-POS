import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = {
	label: string;
	error?: string;
	prefix?: string;
} & TextInputProps;

export default function FormTextField({
	label,
	error,
	multiline,
	prefix,
	...inputProps
}: Props) {
	return (
		<View className="gap-1.5">
			<Text className="text-xs font-bold uppercase tracking-wide text-slate-600">
				{label}
			</Text>
			<View
				className={`flex-row items-center rounded-2xl border bg-white shadow-sm ${
					error ? "border-red-400" : "border-sky-100"
				} ${multiline ? "" : "h-[52px] px-4"}`}
			>
				{prefix ? (
					<Text className="mr-2 text-base font-bold text-sky-600">
						{prefix}
					</Text>
				) : null}
				<TextInput
					{...inputProps}
					multiline={multiline}
					textAlignVertical={multiline ? "top" : "center"}
					placeholderTextColor="#94A3B8"
					className={`flex-1 text-sm font-medium text-slate-800 ${
						multiline ? "h-24 p-4" : "py-0"
					} ${prefix ? "" : ""}`}
				/>
			</View>
			{error ? (
				<Text className="text-xs text-red-500">{error}</Text>
			) : null}
		</View>
	);
}
