import { defineConfig } from '@dovenv/core'
import {
	asciiFont,
	getCurrentDir,
	getObjectFromJSONFile,
	joinPath,
} from '@dovenv/core/utils'
import { config as bandaTheme } from '@dovenv/theme-banda'

const workspaceDir = joinPath( getCurrentDir( import.meta.url ), '..' )
const pkgPath      = joinPath( workspaceDir, 'package.json' )
const pkg          = await getObjectFromJSONFile( pkgPath )

export default defineConfig(
	{
		name  : 'BACKAN',
		desc  : 'Workspace for backan 🔥',
		const : {
			workspaceDir,
			pkg,
			mark : `\n${asciiFont( `pigeonposse\n-------\n${pkg.extra.id}`, 'ANSI Shadow' )}\nAuthor: ${pkg.author.name}\n`,
		},
	},
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
