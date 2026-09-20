import { ReportPeriod } from "@/types/api/report";

function startOfDay(date: Date) {
	const next = new Date(date);
	next.setHours(0, 0, 0, 0);
	return next;
}

export function getPeriodRange(period: ReportPeriod, now = new Date()) {
	const end = now;
	const start = startOfDay(now);

	if (period === "week") {
		start.setDate(start.getDate() - 6);
	}

	if (period === "month") {
		start.setDate(start.getDate() - 29);
	}

	const durationMs = end.getTime() - start.getTime();
	const prevEnd = new Date(start.getTime());
	const prevStart = new Date(start.getTime() - durationMs);

	return {
		start_date: start.toISOString(),
		end_date: end.toISOString(),
		prev_start_date: prevStart.toISOString(),
		prev_end_date: prevEnd.toISOString(),
		comparisonLabel:
			period === "today"
				? "vs yesterday"
				: period === "week"
					? "vs last week"
					: "vs last month",
	};
}

export function pctChange(current: number, previous: number) {
	if (previous === 0) return current > 0 ? 100 : 0;
	return Math.round(((current - previous) / previous) * 1000) / 10;
}
