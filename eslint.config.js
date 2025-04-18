import { lint } from '@dovenv/theme-pigeonposse'

const { dovenvEslintConfig } = lint

/** @type {import('eslint').Linter.Config[]} */
export default [
	dovenvEslintConfig.includeGitIgnore(),
	...dovenvEslintConfig.config,
	dovenvEslintConfig.setIgnoreConfig( [
		'**/templates/**/*',
		'**/partials/**/*',
		'**/*.d.ts',
		'**/CHANGELOG.md',
		'**/README.md',
		'./docs/index.md',
	] ),
]
