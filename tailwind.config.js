

/** @type {import('tailwindcss').Config} */
module.exports = {
  	content: [
    		"./pages/**/*.{js,ts,jsx,tsx}",
    		"./components/**/*.{js,ts,jsx,tsx}",
            "./app/**/*.{js,ts,jsx,tsx}"
  	],
  	theme: {
				extend: {
					"colors": {
						"gray": "#f8fcff",
						"red": "#ff0000",
						"blueviolet": "#673bfb",
						"black": "#000",
						"slateblue": "#543aab"
					},
					fontFamily: {
						"roboto-mono": ["Roboto Mono", "monospace"],
						"roboto-condensed": ["Roboto Condensed", "sans-serif"],
						"roboto": ["Roboto", "sans-serif"],
						"rock-salt": ["Rock Salt", "cursive"]
					}
				}
  	},
  	corePlugins: {
    		"preflight": false
  	},
	darkMode: 'class',
}	