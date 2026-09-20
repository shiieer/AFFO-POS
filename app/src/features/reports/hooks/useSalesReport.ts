import { ReportPeriod, SalesReportApi } from "@/types/api/report";
import { useCallback, useEffect, useState } from "react";
import { getPeriodRange, pctChange } from "../utils/dateRange";
import { fetchSalesReportApi } from "@/services/api/report.api";
import { getErrorMessage } from "@/utils";

export function useSalesReport(period: ReportPeriod) {
	const [current, setCurrent] = useState<SalesReportApi | null>(null);
	const [revenueChange, setRevenueChange] = useState(0);
	const [ordersChange, setOrdersChange] = useState(0);
	const [aovChange, setAovChange] = useState(0);
	const [comparisonLabel, setComparisonLabel] = useState("vs yesterday");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		const range = getPeriodRange(period);

		try {
			setLoading(true);
			setError(null);

			const [nowReport, prevReport] = await Promise.all([
				fetchSalesReportApi({
					start_date: range.start_date,
					end_date: range.end_date,
				}),
				fetchSalesReportApi({
					start_date: range.prev_start_date,
					end_date: range.prev_end_date,
				}),
			]);

			setCurrent(nowReport);
			setComparisonLabel(range.comparisonLabel);
			setRevenueChange(
				pctChange(nowReport.total_revenue, prevReport.total_revenue),
			);
			setOrdersChange(
				pctChange(nowReport.total_orders, prevReport.total_orders),
			);
			setAovChange(
				pctChange(
					nowReport.average_order_value,
					prevReport.average_order_value,
				),
			);
		} catch (err) {
			setError(getErrorMessage(err, "Failed to load sales report"));
		} finally {
			setLoading(false);
		}
	}, [period]);

	useEffect(() => {
		load();
	}, [load]);

	return {
		report: current,
		revenueChange,
		ordersChange,
		aovChange,
		comparisonLabel,
		loading,
		error,
		reload: load,
	};
}
