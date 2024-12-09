import { defineConfig } from '@dovenv/core'
import {
	asciiFont,
	getCurrentDir,
	getObjectFromJSONFile,
	joinPath,
} from '@dovenv/core/utils'

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
)
