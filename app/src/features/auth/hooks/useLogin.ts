import { loginApi } from "@/services/api/auth.api";
import { saveToken } from "@/services/storage/tokenStorage";
import { saveRecentStaff } from "@/services/storage/staffStorage";
import { getErrorMessage } from "@/utils";
import { useState } from "react";

type LoginForm = {
	username: string;
	password: string;
};

export function useLogin(onSuccess?: () => void) {
	const [form, setForm] = useState<LoginForm>({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<
		Partial<Record<keyof LoginForm, string>>
	>({});

	function setField<K extends keyof LoginForm>(key: K, value: LoginForm[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
		setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
		setError(null);
	}

	function resetPassword() {
		setField("password", "");
	}

	function validate() {
		const nextErrors: Partial<Record<keyof LoginForm, string>> = {};

		if (!form.username.trim()) {
			nextErrors.username = "Username is required";
		}

		if (!form.password.trim()) {
			nextErrors.password = "Password is required";
		}

		setFieldErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	}

	async function submit() {
		if (!validate()) return;

		setLoading(true);
		setError(null);

		const raw = form.username.trim();
		const usernameToSend = raw;

		try {
			const result = await loginApi({
				username: usernameToSend,
				password: form.password,
			});

			await saveToken(result.access_token);
			await saveRecentStaff({
				username: result.username,
				role: result.role,
			});
			onSuccess?.();
		} catch (err) {
			setError(getErrorMessage(err, "Authentication failed"));
		} finally {
			setLoading(false);
		}
	}

	return {
		form,
		loading,
		error,
		fieldErrors,
		setField,
		resetPassword,
		submit,
	};
}
