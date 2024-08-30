
import { create }      from '../src/main'
import { TEMPLATES }   from '../src/const'
import {
	joinPath, 
	paths,
	removePathIfExist, 
} from '@backan/config/core'

process.argv.push( '--debug' )

process.on( 'exit', code => {

	console.log( {
		title : 'On exit',
		data  : {
			success : code === 0,
			code,
		},
	} )

} )

for ( const TEMPLATE of Object.values( TEMPLATES ) ) {

	const input     = joinPath( paths.createDir, 'build' )
	const name      = 'examples-' + TEMPLATE
	const inputPath = joinPath( input, name )
		
	await removePathIfExist( inputPath )

	await create( {
		input,
		name, 
		install  : false, 
		template : TEMPLATE, 
	} )
	
}
