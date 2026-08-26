import { View, Text } from "react-native";

export default function AuthHeader() {
    return (
        <View className="mb-10">
            <Text className="text-3xl font-bold text-brand-dark">AFFO POS</Text>
            <Text className="mt-1 text-base text-brand-muted">System Authentication</Text>
        </View>
    )
}