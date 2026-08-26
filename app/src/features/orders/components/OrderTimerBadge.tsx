import { View, Text } from "react-native";
import { formatElapsedTime } from "@/utils";

type Props = {
	elapsedSeconds: number;
	isUrgent?: Boolean;
};

export default function OrderTimerBadge({
	elapsedSeconds,
	isUrgent = false,
}: Props) {
	return (
		<View
			className={`px-2 py-1 rounded-md ${isUrgent ? "bg-red-50" : "bg-brand-surface"}`}
		>
			<Text
				className={`text-xs font-semibold ${
					isUrgent ? "text-red-500" : "text-brand-muted"
				}`}
			>
				{formatElapsedTime(elapsedSeconds)}
			</Text>
		</View>
	);
}
