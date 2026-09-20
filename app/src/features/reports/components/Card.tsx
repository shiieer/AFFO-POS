import { ReactNode } from "react";
import { View, Text } from "react-native";

type Props = {
	title?: string;
	children: ReactNode;
	className?: string;
};

export default function Card({ title, children, className = "" }: Props) {
	return (
		<View
			className={`rounded-2xl border border-brand-border bg-white p-4 ${className}`}
		>
			{title ? <Text>{title}</Text> : null}
			{children}
		</View>
	);
}
