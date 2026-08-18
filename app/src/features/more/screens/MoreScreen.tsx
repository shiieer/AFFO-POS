import { View, Text } from "react-native";
import ScreenContainer from "@/shared/components/ScreenContainer";

export default function MoreScreen() {
	return (
		<ScreenContainer>
			<View className="flex-1 items-center justify-center">
				<Text className="text-brand-muted">More</Text>
			</View>
		</ScreenContainer>
	);
}
