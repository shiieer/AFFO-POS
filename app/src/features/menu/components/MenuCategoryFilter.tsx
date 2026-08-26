import { ScrollView, Pressable, Text } from "react-native";

type Props = {
	categories: string[];
	selected: string;
	onSelect: (category: string) => void;
};

export default function MenuCategoryFilter({
	categories,
	selected,
	onSelect,
}: Props) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="flex-grow-0 bg-white"
			contentContainerClassName="gap-2 px-4 py-3"
		>
			{categories.map((category) => {
				const isActive = category === selected;
				return (
					<Pressable
						key={category}
						onPress={() => onSelect(category)}
						className={`rounded-full px-4 py-2 ${isActive ? "bg-brand-dark" : "bg-brand-surface"}`}
					>
						<Text
							className={`text-sm font-medium ${isActive ? "text-white" : "text-brand-dark"}`}
						>
							{category}
						</Text>
					</Pressable>
				);
			})}
		</ScrollView>
	);
}
