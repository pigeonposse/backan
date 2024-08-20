/**
 * Eslint config.
 *
 * @description Eslint config.
 * 
 * @see https://eslint.org/docs
 * @see https://typescript-eslint.io/
 */

import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';

export default ts.config([
	js.configs.recommended,
	...ts.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				parser: ts.parser,
				project: true,
			}
		}
	},
	{
		ignores: [
			'build/', 
			'dist/'
		]
	}
])
