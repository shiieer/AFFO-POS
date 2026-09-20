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
		<View className="gap-2">
			<Text className="text-xs font-bold uppercase tracking-wide text-slate-600">
				Category
			</Text>
			<View className="flex-row flex-wrap gap-2">
				{categories.map((category) => {
					const isActive = category === selected;
					return (
						<Pressable
							key={category}
							onPress={() => onSelect(category)}
							className={`rounded-full px-4 py-2.5 ${
								isActive
									? "bg-[#0284C7] shadow-sm shadow-sky-500/30"
									: "border border-sky-100 bg-white"
							}`}
						>
							<Text
								className={`text-xs font-semibold tracking-wide ${
									isActive ? "text-white" : "text-slate-600"
								}`}
							>
								{category}
							</Text>
						</Pressable>
					);
				})}
			</View>

			<View className="mt-1 flex-row gap-2">
				<TextInput
					value={draft}
					onChangeText={setDraft}
					placeholder="Or type a new category"
					placeholderTextColor="#94A3B8"
					onSubmitEditing={addDraft}
					className={`h-[52px] flex-1 rounded-2xl border bg-white px-4 text-sm font-medium text-slate-800 shadow-sm ${
						error ? "border-red-400" : "border-sky-100"
					}`}
				/>
				<Pressable
					onPress={addDraft}
					className="h-[52px] items-center justify-center rounded-2xl bg-[#0284C7] px-4"
				>
					<Text className="text-sm font-bold text-white">Add</Text>
				</Pressable>
			</View>

			{error ? (
				<Text className="text-xs text-red-500">{error}</Text>
			) : null}
		</View>
	);
}
