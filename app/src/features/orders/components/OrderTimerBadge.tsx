import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatElapsedTime } from "@/utils";

type Props = {
	elapsedSeconds: number;
	wrapClass: string;
	color: string;
	iconColor: string;
	urgent?: boolean;
};

export default function OrderTimerBadge({
	elapsedSeconds,
	wrapClass,
	color,
	iconColor,
	urgent = false,
}: Props) {
	return (
		<View
			className={`flex-row items-center gap-1 rounded-xl border px-2.5 py-1 ${wrapClass} ${urgent ? "opacity-90" : ""}`}
		>
			<Ionicons
				name={urgent ? "timer-outline" : "time-outline"}
				size={14}
				color={iconColor}
			/>
			<Text className={`font-mono text-xs font-bold ${color}`}>
				{formatElapsedTime(elapsedSeconds)}
			</Text>
		</View>
	);
}
