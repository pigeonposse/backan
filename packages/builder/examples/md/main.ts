import { buildMD } from '../../src/md'
import { app }     from '../app/main'

buildMD( {
	app    : app,
	output : 'openapi.md',
} )
