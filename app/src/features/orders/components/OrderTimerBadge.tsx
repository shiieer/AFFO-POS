import { View, Text } from "react-native";

type Props = {
	elapsedSeconds: number;
	isUrgent?: Boolean;
};

function formatElapsedTime(totalSecond: number) {
	const minutes = Math.floor(totalSecond / 60);
	const seconds = totalSecond % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

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
