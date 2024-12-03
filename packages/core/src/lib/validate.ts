
import { z as validate } from '@hono/zod-openapi'

import type { z as Validate } from '@hono/zod-openapi'

type ObjectInput = { [key: string]: string | number }
type LiteralObjectValue<T> = Validate.ZodLiteral<T[keyof T]>
type LiteralObjectValues<T> = [LiteralObjectValue<T>, ...LiteralObjectValue<T>[]]
type LiteralObjectValuesResponse<T> = Validate.ZodUnion<LiteralObjectValues<T>>

const createLiteralObjectValues = <T extends ObjectInput>( obj: T ): LiteralObjectValuesResponse<T> => {

	const literals = Object.values( obj ).map( value => validate.literal( value ) )
	// @ts-ignore
	return validate.union( literals as LiteralObjectValues<T> )

}

export {
	validate,
	Validate,
	createLiteralObjectValues,
	// createLiteralEnumFromObjectValues,
}
