import { useCallback, useEffect, useState } from "react";
import { fetchUsersApi } from "@/services/api/user.api";
import { fetchTablesApi } from "@/services/api/table.api";
import { fetchOrdersApi } from "@/services/api/order.api";
import { fetchSalesReportApi } from "@/services/api/report.api";
import { getPeriodRange } from "@/features/reports/utils/dateRange";
import { MoreSnapshot } from "../types/more";

const EMPTY: MoreSnapshot = {
	staff: 0,
	tables: 0,
	openTickets: 0,
	sales: 0,
};

export function useMoreOverview() {
	const [snapshot, setSnapshot] = useState<MoreSnapshot>(EMPTY);

	const load = useCallback(async () => {
		try {
			const today = getPeriodRange("today");
			const [users, tables, orders, report] = await Promise.all([
				fetchUsersApi().catch(() => []),
				fetchTablesApi().catch(() => []),
				fetchOrdersApi({ active_only: true }).catch(() => []),
				fetchSalesReportApi({
					start_date: today.start_date,
					end_date: today.end_date,
				}).catch(() => null),
			]);

			setSnapshot({
				staff: Array.isArray(users) ? users.length : 0,
				tables: Array.isArray(tables) ? tables.length : 0,
				openTickets: Array.isArray(orders) ? orders.length : 0,
				sales: report?.total_revenue ?? 0,
			});
		} catch {
			setSnapshot(EMPTY);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	return snapshot;
}
