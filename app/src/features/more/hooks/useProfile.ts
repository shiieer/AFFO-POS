import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchMeApi } from "@/services/api/auth.api";
import { fetchSalesReportApi } from "@/services/api/report.api";
import { getPeriodRange } from "@/features/reports/utils/dateRange";
import { UserApi } from "@/types/api/user";
import { getErrorMessage } from "@/utils";

export type ProfileView = {
	user: UserApi;
	displayName: string;
	initials: string;
	roleLabel: string;
	employeeId: string;
	joinedLabel: string;
	tenureLabel: string;
	ordersToday: number;
};

function displayName(username: string) {
	return username
		.replace(/[._-]/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function initials(username: string) {
	const parts = username.replace(/[._-]/g, " ").trim().split(/\s+/);
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
	}
	return username.slice(0, 2).toUpperCase();
}

function tenure(from: Date, now = new Date()) {
	let months =
		(now.getFullYear() - from.getFullYear()) * 12 +
		(now.getMonth() - from.getMonth());
	if (now.getDate() < from.getDate()) months -= 1;
	months = Math.max(0, months);
	const years = Math.floor(months / 12);
	const rest = months % 12;
	if (years === 0) return `${rest} mo${rest === 1 ? "" : "s"}`;
	if (rest === 0) return `${years} yr${years === 1 ? "" : "s"}`;
	return `${years} yr${years === 1 ? "" : "s"} ${rest} mo${rest === 1 ? "" : "s"}`;
}

export function useProfile() {
	const [user, setUser] = useState<UserApi | null>(null);
	const [ordersToday, setOrdersToday] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const today = getPeriodRange("today");
			const [me, report] = await Promise.all([
				fetchMeApi(),
				fetchSalesReportApi({
					start_date: today.start_date,
					end_date: today.end_date,
				}).catch(() => null),
			]);
			setUser(me);
			setOrdersToday(report?.total_orders ?? 0);
		} catch (err) {
			setError(getErrorMessage(err, "Failed to load profile"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const profile = useMemo<ProfileView | null>(() => {
		if (!user) return null;
		const joined = new Date(user.created_at);
		return {
			user,
			displayName: displayName(user.username),
			initials: initials(user.username),
			roleLabel: user.role === "admin" ? "Store Manager" : "Staff",
			employeeId: `EMP-${String(user.id).padStart(4, "0")}`,
			joinedLabel: joined.toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			}),
			tenureLabel: Number.isNaN(joined.getTime())
				? "—"
				: tenure(joined),
			ordersToday,
		};
	}, [user, ordersToday]);

	return { profile, loading, error };
}
