import { resolve } from 'node:path'
import { build }   from '../src/main'
// import { build } from '../dist/main'

await build( {
	input : resolve( 'examples/server.ts' ),
	// name   : 'backan',
	// outDir : resolve( 'build' ),
	// type   : 'all',
} )
