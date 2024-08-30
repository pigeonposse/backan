import {
	joinPath, paths, removePathIfExist, 
} from '@backan/config/core'

import { create }    from '../src/main'
import { TEMPLATES } from '../src/const'

const input     = joinPath( paths.createDir, 'build' )
const template  = TEMPLATES.DEMO_TS
const name      = 'examples-' + template
const inputPath = joinPath( input, name )

process.on( 'exit', code=> {

	console.log( {
		title : 'On exit',
		data  : {
			success : code === 0,
			code,
		},
	} )

} )

await removePathIfExist( inputPath )

await create( {
	input,
	name, 
	template, 
	install : 'pnpm', 
	open    : false,
} )
