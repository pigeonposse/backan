/**
 * ESLint config.
 *
 * @description ESLint config for JavaScript projects.
 * 
 * @see https://eslint.org/docs
 */
import eslint from '@eslint/js';

export default tseslint.config(
	eslint.configs.recommended,
	{
		ignores: [
			'build/',
			'dist/',
		],
	},
)
