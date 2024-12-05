/* eslint-disable @stylistic/object-curly-newline */

import {
	getCurrentDir,
	joinPath,
} from '@dovenv/core/utils'

import { buildNode } from '../src/main'

const currDir = joinPath( getCurrentDir( import.meta.url ) )

await buildNode( {
	input : joinPath( currDir, 'server' ),
	// name   : 'backan',
	// outDir : resolve( 'build' ),
	// type   : 'all',
} )
