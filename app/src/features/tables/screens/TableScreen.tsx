import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { useState } from "react";
import { useTables } from "../hooks/useTables";
import { TableApi } from "@/types/api/table";
import ScreenContainer from "@/shared/components/ScreenContainer";
import TableHeader from "../components/TableHeader";
import TableFilterBar from "../components/TableFilterBar";
import TableOverview from "../components/TableOverview";
import TableCard from "../components/TableCard";
import Toast from "@/shared/components/Toast";
import TableQrModal from "../components/TableQrModal";
import AddTableModal from "../components/AddTableModal";

type Props = {
	onBack: () => void;
};

export default function TableScreen({ onBack }: Props) {
	const {
		tables,
		counts,
		filter,
		setFilter,
		loading,
		saving,
		error,
		addTable,
	} = useTables();

	const [adding, setAdding] = useState(false);
	const [name, setName] = useState("");
	const [qrTable, setQrTable] = useState<TableApi | null>(null);
	const [toast, setToast] = useState<string | null>(null);

	async function submit() {
		if (!name.trim()) return;
		try {
			await addTable(name);
			setName("");
			setAdding(false);
			setToast("Table added");
		} catch (err) {
			Alert.alert(
				"Error",
				err instanceof Error ? err.message : "Failed to add Table",
			);
		}
	}

	return (
		<ScreenContainer showHeader={false}>
			<TableHeader onBack={onBack} />
			<TableOverview onAdd={() => setAdding(true)} />
			<TableFilterBar
				filter={filter}
				counts={counts}
				onSelect={setFilter}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#0284C7" />
				</View>
			) : error ? (
				<Text className="mt-10 text-center text-red-500">{error}</Text>
			) : (
				<FlatList
					className="flex-1"
					data={tables}
					keyExtractor={(item) => String(item.id)}
					numColumns={2}
					columnWrapperClassName="gap-3"
					contentContainerClassName="px-4 pb-10"
					ListEmptyComponent={
						<Text className="mt-10 text-center text-brand-muted">
							No Tables found
						</Text>
					}
					renderItem={({ item }) => (
						<View className="flex-1">
							<TableCard
								table={item}
								onViewQr={() => setQrTable(item)}
							/>
						</View>
					)}
				/>
			)}

			<Toast message={toast} type="success" />

			<AddTableModal
				visible={adding}
				name={name}
				saving={saving}
				onChangeName={setName}
				onClose={() => setAdding(false)}
				onSubmit={submit}
			/>

			<TableQrModal table={qrTable} onClose={() => setQrTable(null)} />
		</ScreenContainer>
	);
}
