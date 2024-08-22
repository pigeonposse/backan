import { Route }                   from '../route'
import { defaultHOpts }            from './const'
import type { HealthRouteOptions } from './types'

export const getHealthRoute = ( path: string, opts: HealthRouteOptions = {} ) => {

	const {
		error400,
		additionalResponseValues,
		summary,
		description,
	}: HealthRouteOptions = {
		...defaultHOpts,
		...opts,
	}
	// console.log( {
	// 	defaultHOpts,
	// 	opts,
	// } )
	const healthRoute = new Route( {
		path,
	} )
	
	if( error400 ) healthRoute.RESPONSE_MESSAGES.ERROR_400 = error400
	
	const getValidationSuccessParams = () => {

		type ValidateLiteral<T extends boolean> = ReturnType<typeof healthRoute.validation.literal<T>>
		type CustomValues = Record<string, ValidateLiteral<true> | ValidateLiteral<false>>

		const defaultValue = {
			ok : healthRoute.validation.literal( true ),
		} as const
		
		if( !additionalResponseValues ) return defaultValue

		const res: CustomValues & typeof defaultValue = defaultValue
		
		for ( const key in additionalResponseValues ) {

			if ( Object.prototype.hasOwnProperty.call( additionalResponseValues, key ) ) {

				const value = additionalResponseValues[key]
				res[key]    = healthRoute.validation.literal( value as true )
			
			}
		
		}
		return res
	
	}
	
	healthRoute.add( 
		{
			method    : 'get',
			path      : '/',
			summary,
			description,
			responses : {
				200 : healthRoute.response.responseJSONSuccess( healthRoute.validation.object( getValidationSuccessParams() ) ),
				400 : healthRoute.response.responseJSONError400,
				500 : healthRoute.response.responseJSONError500,
			},
			tags : [
				'health',
			],
		},
		async c => {

			try {
	
				const response = {
					ok : true as const,
					...additionalResponseValues,
				}
				return healthRoute.response.addSuccessResponse( c, response ) 
	
			} catch ( e ) {

				return healthRoute.response.add500Error( c, e )
	
			}

		}, 
	)

	return healthRoute

}
