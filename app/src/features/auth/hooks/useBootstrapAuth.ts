import { useEffect, useState } from "react";
import { DEV_LOGIN } from "@/constants/api";
import { loginApi } from "@/services/api/auth.api";
import { getToken, saveToken } from "@/services/storage/tokenStorage";

export function useBootstrapAuth() {
	const [ready, setReady] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		async function bootsrap() {
			try {
				const existing = await getToken();
				if (!existing) {
					const result = await loginApi(DEV_LOGIN);
					await saveToken(result.access_token);
				}
				if (mounted) setReady(true);
			} catch (err) {
				if (mounted) {
					setError(
						err instanceof Error
							? err.message
							: "Failed to authenticate",
					);
				}
			}
		}

		bootsrap();
		return () => {
			mounted = false;
		};
	}, []);
	return { ready, error };
}
