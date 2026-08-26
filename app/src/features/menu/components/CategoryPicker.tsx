import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

type Props = {
	categories: string[];
	selected: string;
	onSelect: (category: string) => void;
	error?: string;
};

export default function CategoryPicker({
	categories,
	selected,
	onSelect,
	error,
}: Props) {
	const [draft, setDraft] = useState("");

	function addDraft() {
		const value = draft.trim();
		if (!value) return;
		onSelect(value);
		setDraft("");
	}

	return (
		<View className="mb-5">
			<Text className="mb-2 text-sm text-brand-dark">Category</Text>
			<View className="flex-row flex-wrap gap-2">
				{categories.map((category) => {
					const isActive = category === selected;
					return (
						<Pressable
							key={category}
							onPress={() => onSelect(category)}
							className={`rounded-lg px-3 py-2 ${isActive ? "bg-brand-dark" : "border border-brand-border bg-white"}`}
						>
							<Text
								className={`text-sm ${isActive ? "text-white" : "text-brand-dark"}`}
							>
								{category}
							</Text>
						</Pressable>
					);
				})}
			</View>

			<View className="mt-3 flex-row gap-2">
				<TextInput
					value={draft}
					onChangeText={setDraft}
					placeholder="Or type a new category"
					placeholderTextColor="#9CA3AF"
					onSubmitEditing={addDraft}
					className={`flex-1 rounded-lg border bg-white px-3 py-3 text-base text-brand-dark ${error ? "border-red-400" : "border-brand-border"}`}
				/>
				<Pressable
					onPress={addDraft}
					className="items-center justify-center rounded-lg bg-brand-dark px-4"
				>
					<Text className="font-semibold text-white">Add</Text>
				</Pressable>
			</View>

			{error ? (
				<Text className="mt-1 text-xs text-red-500">{error}</Text>
			) : null}
		</View>
	);
}
