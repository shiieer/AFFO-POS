import { View, Text } from "react-native";
import { PaymentStatus } from "../types/order";

type Props = {
	status: PaymentStatus;
};

export default function OrderStatusBadge({ status }: Props) {
	const isPaid = status === "paid";

	return (
		<View
			className={`rounded-md border px-2 py-0.5 ${
				isPaid
					? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950"
					: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
			}`}
		>
			<Text
				className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
					isPaid
						? "text-emerald-700 dark:text-emerald-300"
						: "text-amber-700 dark:text-amber-300"
				}`}
			>
				{isPaid ? "Paid" : "Unpaid"}
			</Text>
		</View>
	);
}
