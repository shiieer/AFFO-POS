import { View, Text } from "react-native";
import { formatRp, formatTime, formatWait } from "@/utils";
import { Order } from "../types/order";

function Row({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<View className="flex-row items-center justify-between py-2">
			<Text className="text-sm text-brand-muted">{label}</Text>
			{children}
		</View>
	);
}

type Props = {
	order: Order;
	elapsedSecond: number;
	isUrgent?: boolean;
};

export default function OrderDetailInfoCard({
	order,
	elapsedSecond,
	isUrgent,
}: Props) {
	const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);

	return (
		<View className="rounded-2xl border border-brand-border bg-white p-4">
			<Text className="mb-2 text-base font-bold text-brand-dark">
				Order Details
			</Text>

			<Row label="Table">
				<View className="rounded-md bg-brand-surface px-2 py-1">
					<Text className="text-sm font-medium text-brand-dark">
						{order.locationLabel}
					</Text>
				</View>
			</Row>

			<Row label="Time">
				<Text className="text-sm font-medium text-brand-dark">
					{formatTime(order.createdAt)}
				</Text>
			</Row>

			<Row label="Wait Time">
				<Text
					className={`text-sm font-bold ${
						isUrgent ? "text-red-500" : "text-brand-dark"
					}`}
				>
					{formatWait(elapsedSecond)}
				</Text>
			</Row>

			<View className="my-3 border-t border-brand-border" />

			<Row label="Subtotal">
				<Text className="text-sm text-brand-dark">
					{formatRp(subtotal)}
				</Text>
			</Row>

			<View className="my-3 border-t border-brand-border" />

			<View className="flex-row items-center justify-between">
				<Text className="text-base font-bold text-brand-dark">
					Total
				</Text>
				<Text className="text-base font-bold text-brand-dark">
					{formatRp(order.totalAmount)}
				</Text>
			</View>
		</View>
	);
}
