import { Switch } from "react-native";

type Props = {
	value: boolean;
	onValueChange: (value: boolean) => void;
	activeColor?: string;
};

export default function AvailabilitySwitch({
	value,
	onValueChange,
	activeColor,
}: Props) {
	return (
		<Switch
			value={value}
			onValueChange={onValueChange}
			trackColor={{ false: "#D1D5DB", true: activeColor ?? "#111827" }}
			thumbColor="#FFFFFF"
		/>
	);
}
