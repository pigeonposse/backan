/**
 * ESLint config.
 *
 * @description ESLint config for JavaScript and TypeScript projects.
 * 
 * @see https://eslint.org/docs
 * @see https://typescript-eslint.io/
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	{
		ignores: [
			'build/',
			'dist/',
		],
	},
)
