import { useCallback, useEffect, useState } from "react";
import { getToken, saveToken } from "@/services/storage/tokenStorage";
import { onUnauthorized } from "@/services/auth/session";

export function useBootstrapAuth() {
	const [ready, setReady] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);

	const refreshAuth = useCallback(async () => {
		const token = await getToken();
		setAuthenticated(!!token);
		setReady(true);
	}, []);

	useEffect(() => {
		refreshAuth();
	}, [refreshAuth]);

	useEffect(() => {
		return onUnauthorized(() => {
			setAuthenticated(false);
		});
	}, []);

	return { ready, authenticated, refreshAuth };
}
