import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Order } from "../types/order";

type Props = {
	order: Order;
	updating: boolean;
	onStartPreparing: () => void;
	onMarkReady: () => void;
	onMarkPaid: () => void;
	onCancel: () => void;
	onPrint: () => void;
};

export default function OrderDetailActions({
	order,
	updating,
	onStartPreparing,
	onMarkReady,
	onMarkPaid,
	onCancel,
	onPrint,
}: Props) {
	const isPaid = order.paymentStatus === "paid";
	const canCancel = order.status !== "ready" && order.status !== "cancelled";

	return (
		<View className="gap-3">
			{order.status === "new" ? (
				<Pressable
					onPress={onStartPreparing}
					disabled={updating}
					className="items-center rounded-xl bg-brand-dark py-3.5"
				>
					{updating ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<Text className="font-semibold text-white">
							Start Preparing
						</Text>
					)}
				</Pressable>
			) : null}

			{order.status === "preparing" ? (
				<Pressable
					onPress={onMarkReady}
					disabled={updating}
					className="items-center rounded-xl bg-blue-500 py-3.5"
				>
					{updating ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<Text className="font-semibold text-white">
							Mark Ready
						</Text>
					)}
				</Pressable>
			) : null}

			<View className="flex-row gap-3">
				<Pressable
					onPress={onMarkPaid}
					disabled={updating || isPaid}
					className={`flex-1 items-center rounded-xl border py-3 ${isPaid ? "border-brand-border bg-white opacity-40" : "border-brand-border bg-white"}`}
				>
					<Text className="font-semibold text-brand-dark">
						Mark Paid
					</Text>
				</Pressable>

				<Pressable
					onPress={onCancel}
					disabled={updating || !canCancel}
					className={`flex-1 items-center rounded-xl border py-3 ${canCancel ? "border-red-400 bg-white" : "border-brand-border bg-white opacity-40"}`}
				>
					<Text
						className={`font-semibold ${canCancel ? "text-red-500" : "text-brand-muted"}`}
					>
						Cancel Order
					</Text>
				</Pressable>
			</View>

			<Pressable
				onPress={onPrint}
				disabled={updating}
				className="flex-row items-center justify-center gap-2 rounded-xl border border-brand-border bg-white py-3"
			>
				<Ionicons
					name="document-text-outline"
					size={18}
					color="#111827"
				/>
				<Text className="font-semibold text-brand-dark">
					Print Receipt
				</Text>
			</Pressable>
		</View>
	);
}
