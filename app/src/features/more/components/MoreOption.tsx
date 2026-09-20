import { Pressable, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MoreItem } from "../types/more";

type Props = {
	item: MoreItem;
	isLast?: boolean;
	onPress: () => void;
	toggleValue?: boolean;
	onToggle?: (value: boolean) => void;
};

export default function MoreOption({
	item,
	isLast,
	onPress,
	toggleValue,
	onToggle,
}: Props) {
	const iconColor = item.iconColor ?? (item.danger ? "#E11D48" : "#0284C7");
	const iconBg = item.iconBg ?? (item.danger ? "bg-rose-50" : "bg-sky-50");

	return (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center bg-white px-3.5 py-3.5 ${isLast ? "" : "border-b border-slate-100"}`}
		>
			<View
				className={`h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
			>
				<Ionicons name={item.icon} size={18} color={iconColor} />
			</View>
			<Text
				className={`ml-3 flex-1 text-[15px] font-semibold ${
					item.danger ? "text-rose-600" : "text-slate-800"
				}`}
			>
				{item.label}
			</Text>
			{item.badge ? (
				<View className="mr-2 rounded-full bg-sky-50 px-2 py-0.5">
					<Text className="text-[11px] font-bold text-sky-700">
						{item.badge}
					</Text>
				</View>
			) : null}
			{item.showToggle ? (
				<View onStartShouldSetResponder={() => true}>
					<Switch
						value={toggleValue}
						onValueChange={onToggle}
						trackColor={{ false: "#CBD5E1", true: "#0284C7" }}
						thumbColor="#FFFFFF"
						ios_backgroundColor="#CBD5E1"
					/>
				</View>
			) : (
				<Ionicons
					name="chevron-forward"
					size={18}
					color={item.danger ? "#FB7185" : "#94A3B8"}
				/>
			)}
		</Pressable>
	);
}
