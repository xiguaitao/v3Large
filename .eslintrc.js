module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	parser: 'vue-eslint-parser',
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-strongly-recommended',
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
		'./.eslintrc-auto-import.json',],
	env: {
		browser: true,
		node: true,
		es6: true
	},
	rules: {
		'no-console': 'off',
		'comma-dangle': [2, 'never'] //禁止使用拖尾逗号
	}
}
