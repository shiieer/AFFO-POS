/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				brand: {
					blue: "#2563EB",
					dark: "#111827",
					muted: "#6B7280",
					surface: "#F3F4F6",
					border: "#E5E7EB",
				},
			},
		},
	},
	plugins: [],
};
