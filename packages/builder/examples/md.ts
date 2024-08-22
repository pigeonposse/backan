import { buildMD } from '../src/md'
import { app }     from './app'
buildMD( {
	app    : app,
	output : 'example-openapi.md',
} )
