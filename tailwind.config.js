/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./node_modules/flowbite-react/**/*.js",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./public/**/*.html",
	],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
