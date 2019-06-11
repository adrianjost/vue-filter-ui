module.exports = {
	root: true,
	parser: "vue-eslint-parser",

	parserOptions: {
		parser: "babel-eslint",
		sourceType: "module",
	},

	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#bulb-rules
		"plugin:vue/recommended",
		// https://github.com/prettier/eslint-config-prettier
		"prettier",
		"prettier/standard",
		"prettier/vue",
	],

	rules: {
		"vue/require-prop-types": "error",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"vue/component-name-in-template-casing": [
			"error",
			"PascalCase",
			{
				ignores: [
					"component",
					"template",
					"transition",
					"transition-group",
					"keep-alive",
					"slot",
					"vue-fab",
					"fab-item",
				],
			},
		],
	},

	env: {
		node: true,
	},

	extends: [
		"plugin:vue/recommended",
		"prettier",
		"prettier/standard",
		"prettier/vue",
		"plugin:vue/essential",
		"@vue/prettier",
	],
};
