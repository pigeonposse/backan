import { test }      from '@backan/config/tests'
import { create }    from './main'
import { TEMPLATES } from './const'

test( async ( { section, utils } ) => ( section( {
	title : 'Create templates',
	fn    : async ( { addBooleanTest } ) => {

		await addBooleanTest( {
			title    : 'Create all templates in ./dist path',
			expected : true,
			fn       : async ( ) => {

				try{

					for ( const TEMPLATE of Object.values( TEMPLATES ) ) {

						const input     = utils.joinPath( utils.paths.createDir, 'dist' )
						const name      = 'test-' + TEMPLATE
						const inputPath = utils.joinPath( input, name )
							
						await utils.removePathIfExist( inputPath )

						await create( {
							input,
							name, 
							install  : false, 
							template : TEMPLATE, 
						} )
						
					}

					return true
					
				}catch( _e ){

					console.error( _e )
					return false
					
				}
				
			},
		} )
		
	},
} ) ) )
