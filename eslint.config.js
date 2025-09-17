import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import { fixupPluginRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
		},
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			'react-native': fixupPluginRules(pluginReactNative),
			prettier,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react-native/no-unused-styles': 2,
			'react-native/split-platform-components': 2,
			'react-native/no-inline-styles': 2,
			'react-native/no-color-literals': 2,
			'react-native/no-raw-text': 2,
			'react-native/no-single-element-style-arrays': 2,

			'react-hooks/exhaustive-deps': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',

			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					useTabs: true,
					semi: true,
					trailingComma: 'all',
					bracketSpacing: true,
					printWidth: 120,
					endOfLine: 'auto',
				},
			],
		},
	},
];
