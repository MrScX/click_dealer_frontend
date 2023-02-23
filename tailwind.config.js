/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend:
		{
			fontFamily: {
				"lato": ["Lato", "sans-serif"]
			},
			fontSize: {
				"20xl": "200px",
			},
		},
	},
	plugins: [],
}