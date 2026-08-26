import { createUserApi, fetchUsersApi } from "@/services/api/user.api";
import { CreateUserPayload, UserApi } from "@/types/api/user";
import { getErrorMessage } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export function useStaff() {
	const [staff, setStaff] = useState<UserApi[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchUsersApi();
			setStaff(Array.isArray(data) ? data : []);
		} catch (err) {
			setError(getErrorMessage(err, "Failed to load staff"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	async function addStaff(payload: CreateUserPayload) {
		setSaving(true);
		try {
			const created = await createUserApi(payload);
			setStaff((prev) => [...prev, created]);
			return created;
		} catch (err) {
			throw new Error(getErrorMessage(err, "Failed to add staff"));
		} finally {
			setSaving(false);
		}
	}

	return {
		staff,
		loading,
		saving,
		error,
		addStaff,
		reload: load,
	};
}
