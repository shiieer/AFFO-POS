import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

export function getCategoryIcon(category: string): IconName {
	const name = category.toLowerCase();
	if (name.includes("all")) return "grid-outline";
	if (name.includes("tea")) return "leaf-outline";
	if (name.includes("pastry") || name.includes("bakery") || name.includes("food"))
		return "fast-food-outline";
	if (name.includes("merch") || name.includes("retail")) return "bag-outline";
	if (name.includes("cold") || name.includes("ice") || name.includes("chill"))
		return "snow-outline";
	return "cafe-outline";
}
