import type {
	CreateErrorData, CreateErrorID, 
} from './types'

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
