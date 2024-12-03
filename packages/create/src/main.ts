/* eslint-disable @stylistic/object-curly-newline */
import {
	core,
	TEMPLATE,
} from './core'

export { TEMPLATE }
type CoreParams = NonNullable<Parameters<typeof core.build>[0]>

export type CreateParams = Omit<CoreParams, 'input'> & {
	/** Input: teemplate key or path. */
	input? : typeof TEMPLATE[keyof typeof TEMPLATE]
}
export type CreateOpts = Parameters<typeof core.build>[1]

/**
 * Create project template.
 * @param   {CreateParams}    params - The parameters required for creation.
 * @param   {CreateOpts}      opts   - Optional configuration options.
 * @returns {Promise<object>}        - A promise that resolves to the result of the creation process.
 */
export const create = async ( params: CreateParams, opts?: CreateOpts ) => {

	return await core.build( params as CoreParams, opts )

}
