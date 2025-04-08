import { defaultHOpts } from './const'

import type { AppSuper }           from '../super'
import type { HealthRouteOptions } from './types'

export const setHealthRoute = <A extends AppSuper<object>>( app: A, path: string, opts: HealthRouteOptions = {} ) => {

	const {
		error400,
		additionalResponseValues,
		summary,
		description,
	}: HealthRouteOptions = {
		...defaultHOpts,
		...opts,
	}

	if ( error400 ) app.RESPONSE_MESSAGES.ERROR_400 = error400

	const getValidationSuccessParams = () => {

		type ValidateLiteral<T extends boolean> = ReturnType<typeof app.validation.literal<T>>
		type CustomValues = Record<string, ValidateLiteral<true> | ValidateLiteral<false>>

		const defaultValue = { ok: app.validation.literal( true ) } as const

		if ( !additionalResponseValues ) return defaultValue

		const res: CustomValues & typeof defaultValue = defaultValue

		for ( const key in additionalResponseValues ) {

			if ( Object.prototype.hasOwnProperty.call( additionalResponseValues, key ) ) {

				const value = additionalResponseValues[key]
				res[key]    = app.validation.literal( value as true )

			}

		}
		return res

	}

	app.add(
		{
			method    : 'get',
			path      : path,
			summary,
			description,
			responses : {
				200 : app.response.responseJSONSuccess( app.validation.object( getValidationSuccessParams() ) ),
				400 : app.response.responseJSONError400,
				500 : app.response.responseJSONError500,
			},
			tags : [ 'health' ],
		},
		async c => {

			try {

				const response = {
					ok : true as const,
					...additionalResponseValues,
				}
				return app.response.addSuccessResponse( c, response )

			}
			catch ( e ) {

				return app.response.add500Error( c, e )

			}

		},
	)

	return app

}
