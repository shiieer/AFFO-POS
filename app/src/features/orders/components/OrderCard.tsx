import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getElapsedSeconds } from "@/utils";
import { useAppTheme } from "@/shared/theme/ThemeProvider";
import { Order } from "../types/order";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderTimerBadge from "./OrderTimerBadge";
import OrderItemList from "./OrderItemList";
import OrderActionButtons from "./OrderActionButtons";
import { getOrderCardTheme } from "../utils/orderCardTheme";

type Props = {
	order: Order;
	onPress: () => void;
	onStartPreparing: (orderId: number) => void;
	onPrint: (orderId: number) => void;
	onMarkReady: (orderId: number) => void;
	onMarkServed: (orderId: number) => void;
};

export default function OrderCard({
	order,
	onPress,
	onStartPreparing,
	onPrint,
	onMarkReady,
	onMarkServed,
}: Props) {
	const { isDark } = useAppTheme();
	const [now, setNow] = useState(Date.now());
	const theme = getOrderCardTheme(order, isDark);
	const elapsedSeconds = getElapsedSeconds(order.createdAt, now);
	const showBag = order.locationType === "to-go";

	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<Pressable
			onPress={onPress}
			className={`mb-3.5 overflow-hidden rounded-3xl border ${theme.card}`}
			style={{
				shadowColor: isDark ? "#000000" : "#0EA5E9",
				shadowOpacity: isDark ? 0.35 : 0.08,
				shadowRadius: 16,
				shadowOffset: { width: 0, height: 4 },
				elevation: 2,
			}}
		>
			<View className={`h-1 ${theme.accent}`} />

			<View className="p-4">
				<View className="mb-3 flex-row items-start justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
					<View className="flex-1 pr-3">
						<View className="flex-row flex-wrap items-center gap-2">
							<Text className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
								{order.title}
							</Text>
							{order.tag ? (
								<View
									className={`flex-row items-center gap-1 rounded-full border px-2 py-0.5 ${theme.tagWrap}`}
								>
									{showBag ? (
										<Ionicons
											name="bag-handle-outline"
											size={12}
											color={theme.tagIcon}
										/>
									) : null}
									<Text
										className={`font-mono text-[11px] font-bold ${theme.tagText}`}
									>
										{order.tag}
									</Text>
								</View>
							) : null}
						</View>

						<Text className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">
							{order.orderCode} • {order.sourceLabel}
						</Text>
					</View>

					<View className="items-end gap-1">
						<OrderTimerBadge
							elapsedSeconds={elapsedSeconds}
							wrapClass={theme.timerWrap}
							color={theme.timer}
							iconColor={theme.timerIcon}
							urgent={theme.timerUrgent}
						/>
						<OrderStatusBadge status={order.paymentStatus} />
					</View>
				</View>

				<OrderItemList items={order.items} />

				{order.status !== "cancelled" ? (
					<View onStartShouldSetResponder={() => true}>
						<OrderActionButtons
							status={order.status}
							primaryClass={theme.primary}
							primaryTextClass={theme.primaryText}
							onStartPreparing={() => onStartPreparing(order.id)}
							onPrint={() => onPrint(order.id)}
							onMarkReady={() => onMarkReady(order.id)}
							onMarkServed={() => onMarkServed(order.id)}
						/>
					</View>
				) : null}
			</View>
		</Pressable>
	);
}
