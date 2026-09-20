export type ReportPeriod = "today" | "week" | "month";

export type SalesReportApi = {
	start_date: string | null;
	end_date: string | null;
	total_orders: number;
	paid_orders: number;
	total_revenue: number;
	average_order_value: number;
	by_payment_method: Record<string, number>;
	by_status: Record<string, number>;
	sales_over_time: { label: string; value: number }[];
	top_items: {
		menu_item_id: number;
		name: string;
		quantity_sold: number;
		revenue: number;
	}[];
};
