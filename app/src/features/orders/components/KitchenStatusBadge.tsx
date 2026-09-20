import { View, Text } from "react-native";
import { OrderStatus } from "../types/order";

const STYLES: Record<
	OrderStatus,
	{ label: string; wrap: string; text: string }
> = {
	new: {
		label: "NEW",
		wrap: "border border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950",
		text: "text-sky-700 dark:text-sky-300",
	},
	preparing: {
		label: "IN PROGRESS",
		wrap: "border border-sky-200 bg-sky-100 dark:border-sky-800 dark:bg-sky-950",
		text: "text-sky-700 dark:text-sky-300",
	},
	ready: {
		label: "READY",
		wrap: "border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950",
		text: "text-emerald-700 dark:text-emerald-300",
	},
	served: {
		label: "SERVED",
		wrap: "border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800",
		text: "text-slate-600 dark:text-slate-300",
	},
	cancelled: {
		label: "CANCELLED",
		wrap: "border border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950",
		text: "text-rose-500 dark:text-rose-300",
	},
};

export default function KitchenStatusBadge({
	status,
}: {
	status: OrderStatus;
}) {
	const style = STYLES[status];

	return (
		<View className={`rounded-md px-2 py-0.5 ${style.wrap}`}>
			<Text
				className={`font-mono text-[10px] font-bold tracking-wide ${style.text}`}
			>
				{style.label}
			</Text>
		</View>
	);
}
