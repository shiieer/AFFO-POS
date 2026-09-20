import { Order, OrderStatus } from "../types/order";

export type OrderCardTheme = {
	card: string;
	accent: string;
	timerWrap: string;
	timer: string;
	timerIcon: string;
	timerUrgent: boolean;
	primary: string;
	primaryText: string;
	tagWrap: string;
	tagText: string;
	tagIcon: string;
};

export function getOrderCardTheme(
	order: Order,
	isDark = false,
): OrderCardTheme {
	const urgent =
		Boolean(order.isUrgent) &&
		order.status !== "served" &&
		order.status !== "cancelled";
	const toGo = order.locationType === "to-go";

	if (urgent) {
		return {
			card: "border-rose-200/90 bg-white/90 dark:border-rose-800/80 dark:bg-slate-900/90",
			accent: "bg-rose-400",
			timerWrap: "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950",
			timer: "text-rose-700 dark:text-rose-300",
			timerIcon: isDark ? "#FDA4AF" : "#BE123C",
			timerUrgent: true,
			primary:
				order.status === "preparing" ? "bg-emerald-500" : "bg-sky-600",
			primaryText: "text-white",
			tagWrap: "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950",
			tagText: "text-rose-700 dark:text-rose-300",
			tagIcon: isDark ? "#FDA4AF" : "#BE123C",
		};
	}

	if (toGo) {
		return {
			card: "border-sky-100 bg-white/90 dark:border-slate-700 dark:bg-slate-900/90",
			accent: "bg-sky-400",
			timerWrap:
				"border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800",
			timer: "text-slate-600 dark:text-slate-300",
			timerIcon: isDark ? "#94A3B8" : "#475569",
			timerUrgent: false,
			primary: "bg-sky-600",
			primaryText: "text-white",
			tagWrap:
				"border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950",
			tagText: "text-indigo-700 dark:text-indigo-300",
			tagIcon: isDark ? "#A5B4FC" : "#4338CA",
		};
	}

	return {
		card: "border-sky-200/90 bg-white/90 dark:border-sky-800/70 dark:bg-slate-900/90",
		accent: "bg-sky-400",
		timerWrap: "border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950",
		timer: "text-sky-700 dark:text-sky-300",
		timerIcon: isDark ? "#7DD3FC" : "#0284C7",
		timerUrgent: false,
		primary: order.status === "preparing" ? "bg-emerald-500" : "bg-sky-600",
		primaryText: "text-white",
		tagWrap: "border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950",
		tagText: "text-sky-700 dark:text-sky-300",
		tagIcon: isDark ? "#7DD3FC" : "#0284C7",
	};
}

export function getPrimaryActionLabel(status: OrderStatus) {
	if (status === "new") return "Start Preparing";
	if (status === "preparing") return "Mark Order Ready";
	if (status === "ready") return "Mark Served";
	return null;
}

export function getPrimaryActionIcon(status: OrderStatus) {
	if (status === "new") return "cafe-outline" as const;
	if (status === "preparing") return "checkmark-circle" as const;
	if (status === "ready") return "restaurant-outline" as const;
	return null;
}
