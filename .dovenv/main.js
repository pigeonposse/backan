import { defineConfig }         from '@dovenv/core'
import { config as bandaTheme } from '@dovenv/theme-banda'

import corePlugin from './core.js'

export default defineConfig(
	corePlugin,
	bandaTheme( {
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
		lint : {
			staged : { '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,yml,yaml}': 'pnpm --silent . lint eslint --silent' },
			eslint : { flags: [ '--fix' ] },
		},
		todo : { ws : {
			input     : [ '**/*.{js,ts}', '**/*.md' ],
			inputOpts : {
				gitignore : true,
				onlyFiles : true,
				dot       : true,
			},
		} },
		workspace : { check : { pkg : { schema : async ( {
			v, path, data,
		} ) => {

			if ( !data ) throw new Error( `No data in ${path}` )
			if ( 'private' in data ) return
			return v.object( {
				name        : v.string(),
				version     : v.string(),
				description : v.string(),
			} )

		} } } },
	} ),
)
