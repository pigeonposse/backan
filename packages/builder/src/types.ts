import type {
	BUILDER_TYPE, 
	ERROR_ID, 
} from './const'

export type BuilderProps = {
	/**
	 * The input file for the build process.
	 */
	input: string, 
	/**
	 *
	 */
	name?: string,
	/**
	 * Directory for the output build.
	 *
	 * @default './build'
	 */
	outDir?: string, 
	/**
	 * Build only binary for your current OS.
	 *
	 * @default false
	 */
	onlyOs?: boolean
	/**
	 * The build type Result [all|cjs|bin].
	 *
	 * @default 'all'
	 */
	type?: typeof BUILDER_TYPE[keyof typeof BUILDER_TYPE]
}

export type BuilderErrors = typeof ERROR_ID[keyof typeof ERROR_ID]
