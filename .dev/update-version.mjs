/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import {
	execProcess, 
	exec,
} from '@backan/config/core'

await execProcess( {
	name : 'UPDATE',
	on   : async ( ) => {

		await exec( 'changeset && changeset version' )
	
	},

} )
