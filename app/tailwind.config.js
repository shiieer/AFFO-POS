/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				brand: {
					blue: "#0284C7",
					cyan: "#06B6D4",
					primary: "#006194",
					container: "#007BB9",
					dark: "#1E293B",
					slate: "#3F4850",
					muted: "#64748B",
					surface: "#F0F9FF",
					canvas: "#F4F7FB",
					border: "#E2E8F0",
					hibiscus: "#F43F5E",
				},
			},
		},
	},
	plugins: [],
};
