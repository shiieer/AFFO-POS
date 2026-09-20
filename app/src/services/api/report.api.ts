import { api } from "./client";
import { SalesReportApi } from "@/types/api/report";

export async function fetchSalesReportApi(params?: {
	start_date?: string;
	end_date?: string;
}) {
	const { data } = await api.get<SalesReportApi>("/reports/sales", {
		params,
	});
	return data;
}
