import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type Props = {
	imageUri: string | null;
	onChange: (uri: string | null) => void;
};

export default function PhotoPickerField({ imageUri, onChange }: Props) {
	async function pickImage() {
		const permission =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) return;

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			quality: 0.8,
		});

		if (!result.canceled) {
			onChange(result.assets[0].uri);
		}
	}

	return (
		<Pressable
			onPress={pickImage}
			className="mb-1 h-40 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-sky-300 bg-white shadow-sm"
		>
			{imageUri ? (
				<Image
					source={{ uri: imageUri }}
					style={{ width: "100%", height: "100%" }}
					contentFit="cover"
				/>
			) : (
				<View className="items-center gap-2 px-4">
					<View className="h-12 w-12 items-center justify-center rounded-full bg-sky-50">
						<Ionicons name="image-outline" size={26} color="#0284C7" />
					</View>
					<View className="items-center">
						<Text className="text-sm font-semibold text-slate-700">
							Upload Item Photo
						</Text>
						<Text className="text-xs font-medium text-slate-400">
							PNG, JPG or WEBP up to 5MB
						</Text>
					</View>
				</View>
			)}
		</Pressable>
	);
}
