import type { ERROR_ID }     from './const'
import type { CreateParams } from './types'

type CreateErrorID = typeof ERROR_ID[keyof typeof ERROR_ID]
type CreateErrorData = {
	opts: CreateParams
} & Record<string, unknown>

export class CreateError extends Error {

	constructor( 
		message: CreateErrorID, 
		data: CreateErrorData,
	) {

		super( message )
		this.name = this.constructor.name

		// Añadir propiedades personalizadas
		Object.assign( this, {
			data,
		} )

		// Captura el stack trace (si está disponible)
		if ( Error.captureStackTrace ) {

			Error.captureStackTrace( this, this.constructor )
		
		}
	
	}

}
