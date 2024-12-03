import {
	getCurrentDir,
	joinPath,
} from '@dovenv/utils'

import { buildSchema } from '../../src/schema'
import { app }         from '../app/main'

buildSchema( {
	app,
	output : joinPath( getCurrentDir( import.meta.url ), 'openapi.json' ),
} )
