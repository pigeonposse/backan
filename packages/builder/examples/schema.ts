import { buildSchema } from '../src/schema'
import { app }         from './app'

buildSchema( {
	app,
	output : 'openapi.json',
} )
