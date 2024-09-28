import type { App } from '@backan/core'

export type BuilderMDParams<Env extends object> = {
	/**
	 * The instance of the Backan application used to generate the OpenAPI schema.
	 */
	app: App<Env>,
	/**
	 * The path where the resulting `Markdown` file will be saved.
	 */
	output: string 
}
export type BuilderSchemaParams<Env extends object> = {
	/**
	 * The instance of the Backan application used to generate the OpenAPI schema.
	 */
	app: App<Env>,
	/**
	 * The path where the resulting `json` file will be saved.
	 */
	output: string 
	/**
	 * Generate dts file.
	 *
	 * @default true
	 */
	dts?: boolean
}
