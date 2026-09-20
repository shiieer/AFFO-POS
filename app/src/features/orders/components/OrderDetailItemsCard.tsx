import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatRp } from "@/utils";
import { OrderLineItem } from "../types/order";

export default function OrderDetailItemsCard({
	items,
}: {
	items: OrderLineItem[];
}) {
	const count = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<View className="overflow-hidden rounded-3xl border border-sky-100/90 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90">
			<View className="flex-row items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
				<Text className="text-base font-bold text-slate-900 dark:text-slate-100">
					Items
				</Text>
				<Text className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
					{count} item{count !== 1 ? "s" : ""}
				</Text>
			</View>

			{items.map((item, index) => (
				<View
					key={item.id}
					className={`flex-row items-start px-4 py-3 ${index < items.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}
				>
					<View className="h-5 min-w-[20px] items-center justify-center rounded-lg bg-sky-100 px-0.5 dark:bg-sky-950">
						<Text className="font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
							{item.quantity}x
						</Text>
					</View>

					<View className="ml-3 flex-1">
						<View className="flex-row items-start justify-between">
							<Text className="flex-1 pr-3 font-semibold text-slate-800 dark:text-slate-100">
								{item.name}
							</Text>
							<Text className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300">
								{formatRp(item.subtotal)}
							</Text>
						</View>

						{item.note ? (
							<View className="mt-1 flex-row items-center gap-1">
								<Ionicons
									name="options-outline"
									size={13}
									color="#0284C7"
								/>
								<Text className="text-xs font-medium text-sky-600 dark:text-sky-400">
									{item.note}
								</Text>
							</View>
						) : null}
					</View>
				</View>
			))}
		</View>
	);
}
