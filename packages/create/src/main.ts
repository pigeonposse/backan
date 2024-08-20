/**
 * PACKAGE FILE.
 *
 * @description File with build function.
 */

import { log }               from './log'
import type { CreateParams } from './types'
import { CreateError }       from './error'
import {
	ERROR_ID, OPTS_DEFAULT, 
} from './const'
import { exec } from './exec'

export const create = async ( {
	name = OPTS_DEFAULT.NAME,
	install = OPTS_DEFAULT.INSTALL,
	template = OPTS_DEFAULT.TEMPLATE,
	open = OPTS_DEFAULT.OPEN,
}: CreateParams ) =>( await exec( {
	on : async () => {

		const opts = {
			name,
			install,
			template,
			open,
		}
		
		log.info( 'Starting construction...' )

		log.info( opts )
	
		if( !name ) throw new CreateError( ERROR_ID.NAME_UNDEFINED, {
			opts,
		} )
	
		log.success( 'Build successful!! ✨' )
		
	},
	onExit : async () => {

		return log.warn( 'Process cancelled 👋' )
		
	},
	onError : async e => {

		if( !( e instanceof CreateError ) || e.message === ERROR_ID.UNEXPECTED ) return log.error( {
			message : 'Unexpected error',
			data    : e,
		} )
			
		if( e.message === ERROR_ID.NAME_UNDEFINED ) 
			log.error( {
				message : 'NAME UNDEFINED',
				// @ts-ignore
				data    : e.data || e,
			} )
		return
		
	},
} ) )
