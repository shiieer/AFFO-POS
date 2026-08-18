import { View, Text } from "react-native";
import { PaymentStatus } from "../types/order";

type Props = {
	status: PaymentStatus;
};

export default function OrderStatusBadge({ status }: Props) {
	const isPaid = status === "paid";

	return (
		<View
			className={`px-2 py-1 rounded ${
				isPaid ? "bg-emerald-50" : "bg-brand-surface"
			}`}
		>
			<Text
				className={`text-[10px] font-bold tracking-wide ${isPaid ? "text-emerald-600" : "text-brand-muted"}`}
			>
				{isPaid ? "PAID" : "UNPAID"}
			</Text>
		</View>
	);
}
