import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLogin } from "../hooks/useLogin";
import { fetchActiveStaffApi } from "@/services/api/auth.api";
import { getRecentStaff, StoredStaff } from "@/services/storage/staffStorage";
import { UserApi } from "@/types/api/user";

type Props = {
	onAuthenticated: () => void;
};

const AVATAR_PALETTES = [
	{ bg: "#0284c7", text: "#ffffff" },
	{ bg: "#fce7f3", text: "#be185d" },
	{ bg: "#fef3c7", text: "#b45309" },
	{ bg: "#dcfce7", text: "#16a34a" },
	{ bg: "#ede9fe", text: "#7c3aed" },
	{ bg: "#fee2e2", text: "#b91c1c" },
	{ bg: "#e0f2fe", text: "#0369a1" },
	{ bg: "#f0fdf4", text: "#15803d" },
];

function getInitials(username: string): string {
	const parts = username.replace(/[._-]/g, " ").trim().split(/\s+/);
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
	}
	return username.slice(0, 2).toUpperCase();
}

function getDisplayName(username: string): string {
	return username
		.replace(/[._-]/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

function getPalette(index: number, role: string) {
	if (role === "admin") return AVATAR_PALETTES[0];
	return AVATAR_PALETTES[(index % (AVATAR_PALETTES.length - 1)) + 1];
}

export default function LoginScreen({ onAuthenticated }: Props) {
	const { form, loading, error, fieldErrors, setField, resetPassword, submit } =
		useLogin(onAuthenticated);

	const [selectedUser, setSelectedUser] = useState<UserApi | StoredStaff | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [staffList, setStaffList] = useState<(UserApi | StoredStaff)[]>([]);
	const [staffLoading, setStaffLoading] = useState(true);

	const loadStaff = useCallback(async () => {
		try {
			setStaffLoading(true);
			const data = await fetchActiveStaffApi();
			const list = Array.isArray(data) ? data.filter((u) => u.is_active) : [];
			setStaffList(list);
		} catch {
			const fallback = await getRecentStaff();
			setStaffList(fallback);
		} finally {
			setStaffLoading(false);
		}
	}, []);

	useEffect(() => {
		loadStaff();
	}, [loadStaff]);

	const handleSelectUser = (user: UserApi | StoredStaff) => {
		setSelectedUser(user);
		setField("username", user.username);
	};

	const handleSubmit = () => {
		submit();
	};

	const visibleCrew = staffList.slice(0, 4);

	return (
		<LinearGradient
			colors={["#e0f2fe", "#f0f9ff", "#f9f9ff"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
				<View
					style={{
						position: "absolute",
						left: -80,
						top: -80,
						width: 240,
						height: 240,
						borderRadius: 120,
						backgroundColor: "rgba(56,189,248,0.18)",
					}}
				/>
				<View
					style={{
						position: "absolute",
						bottom: -80,
						right: -80,
						width: 240,
						height: 240,
						borderRadius: 120,
						backgroundColor: "rgba(2,132,199,0.12)",
					}}
				/>
				<View
					style={{
						position: "absolute",
						right: 20,
						top: "25%",
						width: 160,
						height: 160,
						borderRadius: 80,
						backgroundColor: "rgba(244,63,94,0.08)",
					}}
				/>

				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							justifyContent: "center",
							alignItems: "center",
							paddingHorizontal: 20,
							paddingVertical: 32,
						}}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
					>
						<View
							style={{
								width: "100%",
								maxWidth: 400,
								backgroundColor: "rgba(255,255,255,0.95)",
								borderRadius: 28,
								borderWidth: 1,
								borderColor: "rgba(255,255,255,0.7)",
								padding: 28,
								shadowColor: "#0284c7",
								shadowOpacity: 0.16,
								shadowRadius: 30,
								shadowOffset: { width: 0, height: 16 },
								elevation: 10,
							}}
						>
							<View style={{ alignItems: "center", marginBottom: 20 }}>
								<LinearGradient
									colors={["#0284c7", "#38bdf8", "#bae6fd"]}
									start={{ x: 0, y: 1 }}
									end={{ x: 1, y: 0 }}
									style={{
										width: 108,
										height: 108,
										borderRadius: 26,
										padding: 3,
										shadowColor: "#0284c7",
										shadowOpacity: 0.3,
										shadowRadius: 12,
										shadowOffset: { width: 0, height: 5 },
										elevation: 7,
									}}
								>
									<View
										style={{
											flex: 1,
											borderRadius: 23,
											backgroundColor: "#f0f9ff",
											alignItems: "center",
											justifyContent: "center",
											overflow: "hidden",
										}}
									>
										<Ionicons name="cafe" size={44} color="#0284c7" />
										<Text
											style={{
												fontSize: 8,
												fontWeight: "800",
												letterSpacing: 2,
												color: "#0369a1",
												marginTop: 2,
												textTransform: "uppercase",
											}}
										>
											AFFO
										</Text>
									</View>
								</LinearGradient>

								<Text
									style={{
										marginTop: 14,
										fontSize: 22,
										fontWeight: "800",
										color: "#0f172a",
										textAlign: "center",
										letterSpacing: -0.3,
									}}
								>
									AFFO POS
								</Text>
							</View>

							<View style={{ marginBottom: 20 }}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										marginBottom: 10,
									}}
								>
									<Text
										style={{
											fontSize: 10,
											fontWeight: "700",
											letterSpacing: 1.2,
											color: "#94a3b8",
											textTransform: "uppercase",
										}}
									>
										Quick Switch Crew
									</Text>
									{staffList.length > 4 && (
										<Text
											style={{
												fontSize: 11,
												fontWeight: "600",
												color: "#0284c7",
											}}
										>
											+{staffList.length - 4} more
										</Text>
									)}
								</View>

								{staffLoading ? (
									<View
										style={{
											height: 72,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<ActivityIndicator size="small" color="#0284c7" />
									</View>
								) : visibleCrew.length === 0 ? (
									<View
										style={{
											height: 72,
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: "#f8fafc",
											borderRadius: 16,
											borderWidth: 1,
											borderColor: "#e2e8f0",
											borderStyle: "dashed",
										}}
									>
										<Text
											style={{
												fontSize: 12,
												color: "#94a3b8",
												fontWeight: "500",
											}}
										>
											No active staff found
										</Text>
									</View>
								) : (
									<View style={{ flexDirection: "row", gap: 8 }}>
										{visibleCrew.map((user, idx) => {
											const isSelected = selectedUser?.username === user.username;
											const palette = getPalette(idx, user.role);
											const initials = getInitials(user.username);
											const displayName = getDisplayName(user.username);

											return (
												<Pressable
													key={user.username}
													onPress={() => handleSelectUser(user)}
													style={{
														flex: 1,
														alignItems: "center",
														paddingVertical: 10,
														paddingHorizontal: 4,
														borderRadius: 18,
														borderWidth: isSelected ? 2 : 1,
														borderColor: isSelected ? "#0284c7" : "#e2e8f0",
														backgroundColor: isSelected ? "#f0f9ff" : "#f8fafc",
													}}
												>
													<View
														style={{
															width: 40,
															height: 40,
															borderRadius: 20,
															backgroundColor: palette.bg,
															alignItems: "center",
															justifyContent: "center",
															shadowColor: "#0f172a",
															shadowOpacity: 0.08,
															shadowRadius: 4,
															elevation: 2,
														}}
													>
														<Text
															style={{
																fontSize: 11,
																fontWeight: "700",
																color: palette.text,
															}}
														>
															{initials}
														</Text>
													</View>
													<Text
														numberOfLines={1}
														style={{
															marginTop: 5,
															fontSize: 11,
															fontWeight: isSelected ? "700" : "500",
															color: isSelected ? "#0f172a" : "#64748b",
															textAlign: "center",
															width: "100%",
														}}
													>
														{displayName}
													</Text>
												</Pressable>
											);
										})}
									</View>
								)}
							</View>

							<View style={{ gap: 12 }}>
								<View>
									<Text
										style={{
											fontSize: 10,
											fontWeight: "700",
											letterSpacing: 1,
											color: "#475569",
											textTransform: "uppercase",
											marginBottom: 7,
											marginLeft: 2,
										}}
									>
										Staff Member ID
									</Text>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											height: 50,
											borderRadius: 16,
											borderWidth: focusedField === "username" ? 1.5 : 1,
											borderColor:
												focusedField === "username" ? "#0284c7" : "#e2e8f0",
											backgroundColor:
												focusedField === "username" ? "#ffffff" : "#f8fafc",
											paddingHorizontal: 14,
											gap: 10,
											shadowColor:
												focusedField === "username" ? "#0284c7" : "transparent",
											shadowOpacity: 0.12,
											shadowRadius: 8,
											elevation: focusedField === "username" ? 2 : 0,
										}}
									>
										<MaterialIcons name="badge" size={20} color="#94a3b8" />
										<TextInput
											style={{
												flex: 1,
												fontSize: 13,
												fontWeight: "600",
												color: "#0f172a",
												paddingVertical: 0,
											}}
											value={form.username}
											onChangeText={(value) => {
												setField("username", value);
												const match = staffList.find(
													(u) =>
														u.username.toLowerCase() === value.toLowerCase(),
												);
												setSelectedUser(match ?? null);
											}}
											onFocus={() => setFocusedField("username")}
											onBlur={() => setFocusedField(null)}
											placeholder="Staff username"
											placeholderTextColor="#94a3b8"
											autoCapitalize="none"
											autoCorrect={false}
										/>
										{form.username.trim().length > 0 && (
											<MaterialIcons
												name="check-circle"
												size={18}
												color="#10b981"
											/>
										)}
									</View>
									{fieldErrors.username ? (
										<Text
											style={{
												fontSize: 11,
												color: "#ef4444",
												marginTop: 5,
												marginLeft: 2,
											}}
										>
											{fieldErrors.username}
										</Text>
									) : null}
								</View>

								<View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											marginBottom: 7,
											paddingHorizontal: 2,
										}}
									>
										<Text
											style={{
												fontSize: 10,
												fontWeight: "700",
												letterSpacing: 1,
												color: "#475569",
												textTransform: "uppercase",
											}}
										>
											Security PIN
										</Text>
										<Pressable onPress={resetPassword}>
											<Text
												style={{
													fontSize: 11,
													fontWeight: "600",
													color: "#0284c7",
												}}
											>
												Forgot PIN?
											</Text>
										</Pressable>
									</View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											height: 50,
											borderRadius: 16,
											borderWidth: focusedField === "password" ? 1.5 : 1,
											borderColor:
												focusedField === "password" ? "#0284c7" : "#e2e8f0",
											backgroundColor:
												focusedField === "password" ? "#ffffff" : "#f8fafc",
											paddingHorizontal: 14,
											gap: 10,
											shadowColor:
												focusedField === "password" ? "#0284c7" : "transparent",
											shadowOpacity: 0.12,
											shadowRadius: 8,
											elevation: focusedField === "password" ? 2 : 0,
										}}
									>
										<MaterialIcons name="lock" size={20} color="#94a3b8" />
										<TextInput
											style={{
												flex: 1,
												fontSize: 14,
												fontWeight: "600",
												letterSpacing: !showPassword && form.password.length > 0 ? 3 : 0,
												color: "#0f172a",
												paddingVertical: 0,
											}}
											value={form.password}
											onChangeText={(value) => setField("password", value)}
											onFocus={() => setFocusedField("password")}
											onBlur={() => setFocusedField(null)}
											placeholder="Password / PIN"
											placeholderTextColor="#94a3b8"
											secureTextEntry={!showPassword}
											autoCapitalize="none"
											autoCorrect={false}
										/>
										<Pressable
											onPress={() => setShowPassword((v) => !v)}
											accessibilityLabel="Toggle PIN visibility"
											style={{ padding: 4 }}
										>
											<MaterialIcons
												name={showPassword ? "visibility-off" : "visibility"}
												size={20}
												color="#94a3b8"
											/>
										</Pressable>
									</View>
									{fieldErrors.password ? (
										<Text
											style={{
												fontSize: 11,
												color: "#ef4444",
												marginTop: 5,
												marginLeft: 2,
											}}
										>
											{fieldErrors.password}
										</Text>
									) : null}
								</View>

								{error ? (
									<View
										style={{
											backgroundColor: "#fff1f2",
											borderRadius: 12,
											borderWidth: 1,
											borderColor: "#fecdd3",
											paddingHorizontal: 14,
											paddingVertical: 10,
										}}
									>
										<Text
											style={{
												fontSize: 12,
												fontWeight: "600",
												color: "#e11d48",
												textAlign: "center",
											}}
										>
											{error}
										</Text>
									</View>
								) : null}

								<Pressable
									onPress={handleSubmit}
									disabled={loading}
									style={{ marginTop: 4, borderRadius: 16, overflow: "hidden" }}
								>
									<LinearGradient
										colors={
											loading ? ["#7dd3fc", "#7dd3fc"] : ["#0284c7", "#0ea5e9"]
										}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 0 }}
										style={{
											height: 52,
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
											gap: 8,
											shadowColor: "#0284c7",
											shadowOpacity: 0.35,
											shadowRadius: 12,
											shadowOffset: { width: 0, height: 6 },
											elevation: 5,
										}}
									>
										{loading ? (
											<ActivityIndicator color="#ffffff" />
										) : (
											<>
												<Text
													style={{
														fontSize: 15,
														fontWeight: "700",
														color: "#ffffff",
													}}
												>
													Login
												</Text>
											</>
										)}
									</LinearGradient>
								</Pressable>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</LinearGradient>
	);
}
