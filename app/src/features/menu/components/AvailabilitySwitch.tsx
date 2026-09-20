import { Pressable, View } from "react-native";

type Props = {
	value: boolean;
	onValueChange: (value: boolean) => void;
	activeColor?: string;
};

export default function AvailabilitySwitch({
	value,
	onValueChange,
	activeColor = "#0284C7",
}: Props) {
	return (
		<Pressable
			onPress={() => onValueChange(!value)}
			accessibilityRole="switch"
			accessibilityState={{ checked: value }}
			hitSlop={8}
			className="justify-center"
			style={{
				width: 44,
				height: 24,
				borderRadius: 9999,
				backgroundColor: value ? activeColor : "#CBD5E1",
				padding: 2,
			}}
		>
			<View
				style={{
					width: 20,
					height: 20,
					borderRadius: 9999,
					backgroundColor: "#FFFFFF",
					transform: [{ translateX: value ? 18 : 0 }],
					shadowColor: "#000",
					shadowOpacity: 0.18,
					shadowRadius: 2,
					shadowOffset: { width: 0, height: 1 },
					elevation: 2,
				}}
			/>
		</Pressable>
	);
}
