import { lint } from '@dovenv/theme-banda'

const { dovenvEslintConfig } = lint

/** @type {import('eslint').Linter.Config[]} */
export default [
	dovenvEslintConfig.includeGitIgnore(),
	...dovenvEslintConfig.config,
	dovenvEslintConfig.setIgnoreConfig( [
		'**/templates/**/*',
		'**/partials/**/*',
		'**/CHANGELOG.md',
		'**/README.md',
	] ),
]
