import { Ionicons } from "@expo/vector-icons";

export type MoreDestination = "tables" | "staff" | "profile";

export type MoreItem = {
	key: string;
	label: string;
	icon: React.ComponentProps<typeof Ionicons>["name"];
	danger?: boolean;
	destination?: MoreDestination;
};
