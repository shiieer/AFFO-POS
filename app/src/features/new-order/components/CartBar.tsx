import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatRp } from "@/utils";

type Props = {
	itemCount: number;
	total: number;
	submitting: boolean;
	onSubmit: () => void;
};

export default function CartBar({
	itemCount,
	total,
	submitting,
	onSubmit,
}: Props) {
	if (itemCount <= 0) return null;

	return (
		<View className="px-4 pb-3 pt-1">
			<View
				className="flex-row items-center justify-between rounded-2xl border border-white/20 bg-slate-900 p-3.5"
				style={{
					shadowColor: "#0284C7",
					shadowOpacity: 0.35,
					shadowRadius: 24,
					shadowOffset: { width: 0, height: 12 },
					elevation: 8,
				}}
			>
				<View className="flex-row items-center gap-3">
					<View className="h-10 w-10 items-center justify-center rounded-xl bg-white/15">
						<Text className="text-sm font-bold text-cyan-200">
							{itemCount}
						</Text>
					</View>
					<View>
						<Text className="text-[11px] font-semibold uppercase tracking-wider text-cyan-200/90">
							Ticket Subtotal
						</Text>
						<Text className="text-[17px] font-extrabold leading-tight text-white">
							{formatRp(total)}
						</Text>
					</View>
				</View>

				<Pressable
					onPress={onSubmit}
					disabled={submitting}
					className="flex-row items-center gap-1.5 rounded-xl bg-white px-5 py-2.5"
				>
					{submitting ? (
						<ActivityIndicator color="#006194" />
					) : (
						<>
							<Text className="text-xs font-extrabold text-brand-primary">
								Review & Pay
							</Text>
							<Ionicons
								name="arrow-forward"
								size={16}
								color="#006194"
							/>
						</>
					)}
				</Pressable>
			</View>
		</View>
	);
}
