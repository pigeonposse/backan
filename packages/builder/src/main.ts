/**
 * PACKAGE FILE.
 *
 * @description File with build function.
 */
// @ts-ignore
import ncc                 from '@vercel/ncc'
import { exec as execPkg } from '@yao-pkg/pkg'
import esbuild             from 'esbuild'
import {
	ERROR_ID, 
	target, 
	name,
	BUILDER_TYPE,
	ARCH,
} from './const'

import {
	deleteFile,
	existsFlag,
	existsPath,
	getArch, 
	getFilename, 
	getFlagValue, 
	getPlatform, 
	joinPath,
	resolvePath,
	writeFile,
} from './utils'
import { zipFilesInDirectory } from './compress'
import type {
	BuilderErrors, 
	BuilderProps, 
} from './types'

/**
 * FUNCTIONS.
 */

const log = {
	debug   : ( data: object | string ) => console.debug( `\n🔥⬛ [${name}]`, data ),
	info    : ( data: object | string ) => console.log( `\n🔥🟦 [${name}]`, data ),
	success : ( data: object | string ) => console.log( `\n🔥✅ [${name}]`, data ),
	warn    : ( data: object | string ) => console.warn( `\n🔥🟡 [${name}]`, data ),
	error   : ( data: object | string ) => console.error( `\n🔥❌ [${name}]`, data ),
}

class BuildError extends Error {

	constructor( 
		message: BuilderErrors, 
		data: {
			platform: string
			arch: string
			opts: BuilderProps
		} & Record<string, unknown>, 
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

export const buildConstructor = async ( { 
	input,
	name, 
	outDir = resolvePath( 'build' ),
	onlyOs = false,
	type = BUILDER_TYPE.ALL, 
}: BuilderProps ) => {

	const arch         = await getArch()
	const plat         = await getPlatform()
	const projectBuild = outDir 

	if( !name ) name = getFilename( input )

	const flags = {
		input  : getFlagValue( 'input' ), 
		onlyOs : existsFlag( 'onlyOs' ),
		outDir : getFlagValue( 'outDir' ),
		type   : getFlagValue( 'type' ),
	}

	if( flags.input ) input = flags.input
	if( flags.onlyOs ) onlyOs = flags.onlyOs
	if( flags.outDir ) outDir = flags.outDir
	if( flags.type && type.includes( flags.type ) ) type = flags.type as typeof type

	const projectBuildBin       = joinPath( projectBuild,'bin' )
	const projectBuildZip       = joinPath( projectBuild,'zip' )
	const projectBuildCjs       = joinPath( projectBuild,'cjs' )
	const projectBuildCjsFile   = joinPath( projectBuildCjs,'node.cjs' )
	const projectBuildIndexFile = joinPath( projectBuildCjs,'index.cjs' )
	const data                  = {
		platform : plat,
		arch,
		opts     : {
			input,
			name, 
			outDir,
			onlyOs,
			type, 
		},
	}

	const endpoint = input 
	const exists   = await existsPath( endpoint )
	if( !exists ) throw new BuildError( ERROR_ID.NO_INPUT, data )

	if( plat === 'unknown' ) throw new BuildError( ERROR_ID.PLATFORM_UNKWON, data )

	const getTargets = ( arch: typeof ARCH[keyof typeof ARCH] ) => ( onlyOs ? [
		`${target}-${plat}-${arch}`,	
	] : [
		`${target}-alpine-${arch}`,
		`${target}-linux-${arch}`,
		`${target}-linuxstatic-${arch}`,
		`${target}-macos-${arch}`,
		`${target}-win-${arch}`,
	] )
	
	const targets = arch === ARCH.ARM64 ? 
		[
			...getTargets( ARCH.ARM64 ),
			...getTargets( ARCH.X64 ),
		] : 
		getTargets( ARCH.X64 )
	
	/**
	 * ESBUILD BUILD.
	 *
	 * @see https://esbuild.github.io/api/#build
	 */
	log.debug( 'Building cjs file...' )
	console.group( )
	await esbuild.build( {
		entryPoints : [
			endpoint,
		],
		bundle   : true,
		format   : 'cjs',
		platform : 'node',
		target,
		outfile  : projectBuildCjsFile,
	} ).catch( err => {

		console.groupEnd()
		throw new BuildError( ERROR_ID.ON_ESBUILD,{
			...data, 
			error : err,
		} )
	
	} )
	console.groupEnd()
	
	/**
	 * NCC BUILD.
	 *
	 * @see https://github.com/vercel/ncc?tab=readme-ov-file#programmatically-from-nodejs
	 */
	log.debug( 'Converting cjs file in a single file...' )
	console.group( )
	const { code } = await ncc( projectBuildCjsFile, {
		minify : true,
		cache  : false,
		// target,
	} ).catch( ( error: unknown ) => {

		console.groupEnd()
		throw new BuildError( ERROR_ID.ON_NCC,{
			...data, 
			error,
		} )
	
	} )
	console.groupEnd()

	await writeFile( projectBuildIndexFile, code )
	await deleteFile( projectBuildCjsFile )

	if ( type === BUILDER_TYPE.CJS ) return

	/**
	 * PKG BUILD.
	 *
	 * @see https://www.npmjs.com/package/@yao-pkg/pkg
	 */
	log.debug( 'Creating binaries...' )
	console.group( )
	await execPkg( [
		projectBuildIndexFile,
		'--targets', targets.join( ',' ),
		'--output', joinPath( projectBuildBin, name ),
		'--compress', 'GZip', 
		// '--debug',
	] ).catch( ( error: unknown ) => {

		console.groupEnd( )
		throw new BuildError( ERROR_ID.ON_PKG,{
			...data, 
			error,
		} )
	
	} )
	console.groupEnd( )
	if ( type === BUILDER_TYPE.BIN ) return

	// ZIP
	log.debug( 'Creating zips...' )

	console.group( )
	await zipFilesInDirectory(
		projectBuildBin,
		projectBuildZip,
	)
	console.groupEnd( )
	
}

/**
 * Package your backan App for different platforms based on the architecture.
 *
 * This function performs the following steps:
 * 1. Determines the architecture of the system.
 * 2. Builds the project using `esbuild`.
 * 3. Transpiles the build using `ncc`.
 * 4. Packages the transpiled output using `pkg`.
 * 5. Zips the final binaries.
 *
 * @param   {object}            params        - The parameters for creating the binaries.
 * @param   {string}            params.name   - The name of the binary file to be created.
 * @param   {string}            params.outDir - Directory for the output build.
 * @param   {string}            params.input  - The input file for the build process.
 * @param   {'all'|'cjs'|'bin'} params.type   - The build type Result [all|cjs|bin].
 * @param   {string}            params.onlyOs - Build only binary for your current OS.
 * @returns {Promise<void>}                   - A promise that resolves when the binary creation process is complete.
 */
export const build = async ( params: BuilderProps ) =>{

	// This is not recomended but is for not display `(node:31972) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.` message.
	// @ts-ignore
	process.noDeprecation = true

	process.on( 'exit', async function ( code ){

		if( code !== 130 ) return

		console.groupEnd()
		console.log( '\n' )
		return log.warn( 'Process cancelled 👋' )
	
	} )

	const start = performance.now()
	const stop  = () => log.info( `Total time: ${( ( performance.now() - start ) / 1000 ).toFixed( 2 )} seconds.` )

	try {

		log.info( 'Starting construction...' )
		console.group()
		await buildConstructor( params )
		console.groupEnd()
		log.success( 'Build successful!! ✨' )
	
	}catch( e ){

		console.groupEnd()
		// @ts-ignore
		if( 'name' in e && e.name === 'ExitPromptError' ) return log.warn( 'Process cancelled 👋' )
		if( !( e instanceof BuildError ) ) return log.error( {
			message : 'Unexpected error',
			data    : e,
		} )
		
		if( e.message === ERROR_ID.ON_PKG ) 
			log.error( {
				message : 'Error on PKG',
				// @ts-ignore
				data    : e.data || e,
			} )
		if( e.message === ERROR_ID.ON_NCC ) 
			log.error( {
				message : 'Error on NCC',
				// @ts-ignore
				data    : e.data || e,
			} )
		if( e.message === ERROR_ID.ON_ESBUILD ) 
			log.error( {
				message : 'Error on ESBUILD',
				// @ts-ignore
				data    : e.data || e,
			} )
		if( e.message === ERROR_ID.NO_INPUT ) 
			log.error( {
				message : 'Input is not valid', 
				// @ts-ignore
				data    : e.data,
			} )
		if( e.message === ERROR_ID.PLATFORM_UNKWON ) 
			log.error( {
				message : 'Your platform cannot be detected correctly or is unknown. Try to build without [onlyOS] flag',
				// @ts-ignore
				data    : e.data,
			} )
		if( e.message === ERROR_ID.UNEXPECTED ) 
			log.error( {
				message : 'Unexpected error',
				data    : e,
			} )
		return
	
	}finally{

		stop()
	
	}

}
