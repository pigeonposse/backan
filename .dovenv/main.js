import { defineConfig } from '@dovenv/core'
import ppTheme          from '@dovenv/theme-pigeonposse'

import core from './core.js'

export default defineConfig(
	ppTheme( {
		core,
		repo : { commit : { scopes : [
			{
				value : 'core',
				desc  : 'Core package',
			},
			{ value: 'docs' },
			{ value: 'server' },
			{ value: 'builder' },
			{ value: 'create' },
			{ value: 'backan' },
			{
				value : 'all',
				desc  : 'All packages',
			},
			{
				value : 'env',
				desc  : 'Only development environment',
			},
		] } },
		lint : { staged: { '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,yml,yaml}': 'pnpm --silent . lint eslint --silent' } },
		todo : { ws : {
			input     : [ '**/*.{js,ts}', '**/*.md' ],
			inputOpts : {
				gitignore : true,
				onlyFiles : true,
				dot       : true,
			},
		} },
	} ),
)
