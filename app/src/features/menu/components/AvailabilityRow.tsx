import { View, Text } from "react-native";
import AvailabilitySwitch from "./AvailabilitySwitch";

type Props = {
	value: boolean;
	onValueChange: (value: boolean) => void;
};

export default function AvailabilityRow({ value, onValueChange }: Props) {
	return (
		<View className="flex-row items-center justify-between rounded-xl border border-brand-border px-4 py-3">
			<View className="flex-1 pr-3">
				<Text className="font-semibold text-brand-dark">
					Item Availability
				</Text>
				<Text className="mt-0.5 text-xs text-brand-muted">
					Visible to customers on menu
				</Text>
			</View>
			<AvailabilitySwitch value={value} onValueChange={onValueChange} />
		</View>
	);
}
