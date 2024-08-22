import { buildSchema } from '../src/schema'
import { app }         from './app'
buildSchema( {
	app    : app,
	output : 'example-openapi.json',
} )
