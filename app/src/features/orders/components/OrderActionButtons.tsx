import { View, Pressable, Text } from "react-native";
import { OrderStatus } from "../types/order";

type Props = {
	status: OrderStatus;
	onStartPreparing: () => void;
	onPrint: () => void;
	onMarkReady: () => void;
};

export default function OrderActionButtons({
	status,
	onStartPreparing,
	onPrint,
	onMarkReady,
}: Props) {
	if (status === "new") {
		return (
			<Pressable
				onPress={onStartPreparing}
				className="bg-brand-dark rounded-xl py-3 items-center"
			>
				<Text className="text-white text-sm font-semibold">
					Start Preparing
				</Text>
			</Pressable>
		);
	}

	if (status === "preparing") {
		return (
			<View className="flex-row gap-3">
				<Pressable
					onPress={onPrint}
					className="flex-1 border border-brand-border rounded-xl py-3 items-center bg-white"
				>
					<Text className="text-brand-dark text-sm font-semibold">
						Print
					</Text>
				</Pressable>

				<Pressable
					onPress={onMarkReady}
					className="flex-1 bg-brand-blue rounded-xl py-3 items-center"
				>
					<Text className="text-white text-sm fonr-semibold">
						Mark Ready
					</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<Pressable
			onPress={onPrint}
			className="border border-brand-border rounded-xl py-3 items-center bg-white"
		>
			<Text className="text-brand-dark text-sm font-semibold">Print</Text>
		</Pressable>
	);
}
