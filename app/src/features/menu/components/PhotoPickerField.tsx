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
			className="mb-5 h-40 items-center justify-center overflow-hidden rounded-xl border border-brand-border bg-brnad-surface"
		>
			{imageUri ? (
				<Image
					source={{ uri: imageUri }}
					style={{ width: "100%", height: "100%" }}
					contentFit="cover"
				/>
			) : (
				<View className="items-center">
					<Ionicons name="camera-outline" size={28} color="#6B7280" />
					<Text className="mt-2 text-sm text-brand-muted">
						Upload Photo
					</Text>
				</View>
			)}
		</Pressable>
	);
}
