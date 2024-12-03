
import {
	create,
	TEMPLATE,
} from '../src/main'

await create( {
	input      : TEMPLATE.DEMO_TS,
	output     : 'build/test',
	name       : 'test-demo',
	// install    : 'none',
	openEditor : 'code',
} )
