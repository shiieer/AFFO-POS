import { View, Text, Pressable } from "react-native";

type Props = {
	onEditProfile: () => void;
};

export default function ProfileCard({ onEditProfile }: Props) {
	return (
		<View className="mb-4 overflow-hidden rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-sm">
			<View className="flex-row items-center gap-3">
				<View className="relative">
					<View className="h-14 w-14 items-center justify-center rounded-full bg-sky-600">
						<Text className="text-lg font-extrabold text-white">
							KA
						</Text>
					</View>
					<View className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
				</View>
				<View className="flex-1">
					<View className="flex-row flex-wrap items-center gap-1.5">
						<Text className="text-base font-extrabold text-slate-900">
							Kedai Affo
						</Text>
						<View className="rounded-full bg-sky-50 px-2 py-0.5">
							<Text className="text-[10px] font-bold uppercase tracking-wide text-sky-700">
								Shift Lead
							</Text>
						</View>
					</View>
					<Text className="mt-0.5 text-xs font-medium text-slate-500">
						pos@kedaiaffo.id
					</Text>
				</View>
			</View>
			<Pressable
				onPress={onEditProfile}
				className="mt-3.5 items-center rounded-xl bg-sky-50 py-2.5"
			>
				<Text className="text-sm font-bold text-sky-700">
					Edit Profile
				</Text>
			</Pressable>
		</View>
	);
}
