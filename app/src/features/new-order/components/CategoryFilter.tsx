import { ScrollView, Pressable, Text } from "react-native";

type Props = {
	categories: string[];
	selected: string;
	onSelect: (category: string) => void;
};

export default function CategoryFilter({
	categories,
	selected,
	onSelect,
}: Props) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="flex-grow-0"
			contentContainerClassName="px-4 py-3 gap-2"
		>
			{categories.map((category) => {
				const isActive = category === selected;

				return (
					<Pressable
						key={category}
						onPress={() => onSelect(category)}
						className={`px-4 py-2 rounded-full ${isActive ? "bg-brand-dark" : "bg-white"}`}
					>
						<Text
							className={`text-sm font-medium ${isActive ? "text-white" : "text-brand-muted"}`}
						>
							{category}
						</Text>
					</Pressable>
				);
			})}
		</ScrollView>
	);
}
