import { useState } from "react";
import { MoreDestination } from "./types/more";
import { TableScreen } from "../tables";
import MoreScreen from "./screens/MoreScreen";
import { StaffScreen } from "../staff";

export default function MoreNavigator() {
	const [destination, setDestination] = useState<MoreDestination | null>(
		null,
	);

	if (destination === "tables") {
		return <TableScreen onBack={() => setDestination(null)} />;
	}

	if (destination === "staff") {
		return <StaffScreen onBack={() => setDestination(null)} />;
	}

	return <MoreScreen onNavigate={(dest) => setDestination(dest)} />;
}
