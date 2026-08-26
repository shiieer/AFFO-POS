import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { ManagedMenuItem } from "../types/menu";
import { formatRp } from "@/utils";
import AvailabilitySwitch from "./AvailabilitySwitch";

type Props = {
	item: ManagedMenuItem;
	onPress: () => void;
	onToggle: (item: ManagedMenuItem) => void;
};

export default function MenuItemCard({ item, onPress, onToggle }: Props) {
	return (
		<View className="mb-3 overflow-hidden rounded-2xl border border-brand-border bg-white">
			<View className="flex-row items-center gap-3 p-3">
				<View
					className={`w-1.5 ${item.isAvailable ? "bg-emerald-400" : "bg-red-400"}`}
				/>
				<Pressable
					onPress={onPress}
					className="flex-1 flex-row items-center"
				>
					<View className="h-16 w-16 overflow-hidden rounded-xl bg-brand-surface">
						{item.image ? (
							<Image
								source={{ uri: item.image }}
								style={{ width: "100%", height: "100%" }}
								contentFit="cover"
							/>
						) : (
							<View className="flex-1 items-center justify-center">
								<Text className="text-[10px] text-brand-muted">
									No Image
								</Text>
							</View>
						)}
					</View>

					<View className="ml-3 flex-1">
						<Text
							className={`text-base font-bold ${item.isAvailable ? "text-brand-dark" : "text-brand-muted"}`}
						>
							{item.name}
						</Text>

						<Text className="mt-0.5 text-xs text-brand-muted">
							{item.category}
						</Text>

						{!item.isAvailable ? (
							<Text className="mt-1 text-[10px] font-bold tracking-wide text-red-500">
								OUT OF STOCK
							</Text>
						) : null}

						<Text
							className={`mt-2 font-semibold ${item.isAvailable ? "text-brand-dark" : "text-brand-muted"}`}
						>
							{formatRp(item.price)}
						</Text>
					</View>
				</Pressable>

				<AvailabilitySwitch
					value={item.isAvailable}
					onValueChange={() => onToggle(item)}
					activeColor="#5DDCAD"
				/>
			</View>
		</View>
	);
}
