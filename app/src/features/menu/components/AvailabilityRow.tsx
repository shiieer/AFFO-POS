import { View, Text } from "react-native";
import AvailabilitySwitch from "./AvailabilitySwitch";

type Props = {
	value: boolean;
	onValueChange: (value: boolean) => void;
};

export default function AvailabilityRow({ value, onValueChange }: Props) {
	return (
		<View className="flex-row items-center justify-between rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
			<View className="flex-1 pr-4">
				<Text className="text-sm font-bold text-slate-800">
					Item Availability
				</Text>
				<Text className="text-xs font-medium text-slate-500">
					Visible to customers on menu
				</Text>
			</View>
			<AvailabilitySwitch value={value} onValueChange={onValueChange} />
		</View>
	);
}
