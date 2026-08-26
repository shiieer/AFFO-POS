import { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

type ToastType = "success" | "error" | "info";

type Props = {
	message: string | null;
	type?: ToastType;
};

const typeStyle: Record<ToastType, string> = {
	success: "bg-emerald-500",
	error: "bg-red-500",
	info: "bg-brand-blue",
};

const styles = StyleSheet.create({
	wrap: {
		position: "absolute",
		left: 24,
		right: 24,
		bottom: 160,
		zIndex: 999,
		elevation: 20,
	},
});

export default function Toast({ message, type = "success" }: Props) {
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!message) {
			opacity.setValue(0);
			return;
		}

		opacity.setValue(0);
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.delay(2000),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start();
	}, [message, opacity]);

	if (!message) return null;
	return (
		<Animated.View pointerEvents="none" style={[styles.wrap, { opacity }]}>
			<View
				className={`rounded-xl px-4 py-3 shadow-lg ${typeStyle[type]}`}
			>
				<Text className="text-center font-semibold text-white">
					{message}
				</Text>
			</View>
		</Animated.View>
	);
}
