/**
 * PACKAGE FILE.
 *
 * @description File with build function.
 */

import {
	cancel,
	log, 
	note,
	outro,
	spinner, 
}        from '@clack/prompts'
import { CreateError } from './error'
import {
	ERROR_ID, 
	OPTS_DEFAULT, 
	bugsUrl,
} from './const'
import {
	exec, 
	execBoolChildCMD, 
	execCMD, 
}     from './exec'
import {
	changeJSONvalues,
	copyDir,
	existsPath, 
	joinPath,
	resolvePath, 
} from './fs'
import type {
	CreateErrorData, 
	CreateParams, 
} from './types'
import {
	green, 
	italic, 
	link, 
} from './color'
import { existsFlag } from './flags'

const debug = existsFlag( 'debug' )

/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/check-param-names */
/**
 * Create BACKAN template project.
 *
 * @param {object} opts - Options for create template project.
 * @see https://backan.pigeonposse.com/guide/create
 */
export const create = async ( {

	name = OPTS_DEFAULT.NAME,
	input = OPTS_DEFAULT.INPUT,
	install = OPTS_DEFAULT.INSTALL,
	template = OPTS_DEFAULT.TEMPLATE,
	open = OPTS_DEFAULT.OPEN,
}: CreateParams ) =>{
 
	const s = spinner()
	await exec( {
		on : async () => {

			const data: CreateErrorData = {
				opts : {
					input,
					name,
					install,
					template,
					open,
				},
			}

			s.start( 'Starting construction...' )

			// EXISTS NAME
			if( !name ) throw new CreateError( ERROR_ID.NAME_UNDEFINED, data )

			// EXISTS INPUT DIR
			const inputDir    = resolvePath( input ? joinPath( input, name ) : name )
			const existsInput = await existsPath( inputDir )
			data.inputDir     = inputDir
			if( existsInput ) throw new CreateError( ERROR_ID.EXIST_INPUT_DIR, data )
		
			// EXISTS TEMPLATE
			const __dirname      = new URL( '.', import.meta.url ).pathname
			const templateDir    = resolvePath( __dirname, '..','templates', template )
			const existsTemplate = await existsPath( templateDir )
			data.templateDir     = templateDir
			if( !existsTemplate ) throw new CreateError( ERROR_ID.TEMPLATE_NO_EXIST, data )
		
			// COPY TEMPLATE
			try {

				await copyDir( templateDir, inputDir )
		
			}catch( e ){
			
				data.error = e
				throw new CreateError( ERROR_ID.COPY_TEMPLATE_FAIL, data )
		
			}

			// check if PACKAGE created exist
			const inputPackagePath = resolvePath( inputDir, 'package.json' )
			const existsPkg        = await existsPath( inputPackagePath )
			data.inputPackagePath  = inputPackagePath
			if( !existsPkg ) throw new CreateError( ERROR_ID.PKG_CREATED_NOT_FOUND, data )
		
			// CHANGE PACKAGE project DATA
			try {

				await changeJSONvalues( inputPackagePath, {
					name,
				} )
			
			}catch( e ){
	
				data.error = e
				throw new CreateError( ERROR_ID.PKG_CHANGED_VALUES_FAIL, data )
			
			}

			let failedInstallation = false, 
				failedOpen = false

			// INSTALL 
			// If fail continue with warn but not create error
			if( install )
				try {

					s.message( 'Installing dependences...' ) 
					const dirFlag = install === 'pnpm' ? '--dir' : install === 'npm' ? '--prefix' : '--cwd'
					const cmd     = `${install} install ${dirFlag} ${inputDir}`
					s.message( `Using: ${cmd}` )
					const res = await execBoolChildCMD( cmd )
					if( !res ) throw Error( 'failed' )

					s.message( 'Correctly installed dependencies' )
			
				}catch( _e ){

					if( debug ) log.warn( `Dependency installation error: ${_e}` )
					failedInstallation = true
			
				}

			// OPEN 
			// If fail exit with warn but not with error
			if( open )
				try {
		
					s.message( `Opening in ${open}` ) 
					await execCMD( `${open} ${inputDir}` )
					s.message( 'IDE opened successfully' )
			
				}catch( _e ){

					if( debug ) log.warn( `Error opening in [${open}]: ${_e}` )
					failedOpen = true
		
				}
		
			s.stop( 'Construction completed!' )

			// IF fails
			const titleInit = 'Init commands'
			const initcmd   = install ? install + ' dev' : 'npm dev'
			if( failedOpen && failedInstallation ) {

				log.step( '' )
				log.warn( 'Failed to install dependencies and open project' )
				log.step( '' )
				note( `cd ${name}\n${install} install\n${initcmd}`, titleInit )
		
			}else if ( failedOpen ) {

				log.step( '' )
				log.warn( `Failed to open project with [${open}] command` )
				log.step( '' )
				note( `cd ${name}\n${initcmd}`, titleInit )
		
			} else if ( failedInstallation ) {

				log.step( '' )
				log.warn( `Failed to install dependencies with [${install}]` )
				log.step( '' )
				note( `${install} install\n${initcmd}`,titleInit )
		
			}

			// if( initcmd ) note( `${initcmd}`, titleInit )

			log.step( '' )
			outro( `🔥 Let's work with ${green( 'backan' )} 🔥` )
			process.exit( 0 )
	
		},
		onExit : async () => {

			log.warn( 'Process cancelled 👋' )
			s.stop()
			return
		
		},
		onError : async e => {

			const error = { 
				title : 'Unexpected error',
				error : {
					message : e instanceof Error ? e.message : 'Unknown error',
					name    : e instanceof Error ? e.name : 'Error',
					stack   : e instanceof Error ? e.stack?.split( '\n' ) : [
						'No stack available',
					],
				},
				opts : e instanceof CreateError && 'data' in e ? e.data : 'No opts available',
			}
			if( !( e instanceof CreateError ) || e.message === ERROR_ID.UNEXPECTED ) error.title =  'Unexpected error'
			else if( e.message === ERROR_ID.NAME_UNDEFINED ) error.title =  'name option must exists'
			// @ts-ignore
			else if( e.message === ERROR_ID.EXIST_INPUT_DIR ) error.title =  `Can not create project. Input dir [${e.data.inputDir}] already exists`
			// @ts-ignore
			else if( e.message === ERROR_ID.TEMPLATE_NO_EXIST ) error.title = `Template path [${e.data.templateDir}] does not exists`
			else error.title = e.message

			s.stop( 'Process closed 💔', 1 )

			log.step( '' )

			// @ts-ignore
			if( debug ) cancel( `Debug error: ${JSON.stringify( error, null, 2 )}` )
			else cancel( `Error: ${error.title}\n\n   You can debug the error with the ${italic( '--debug' )} flag\n   Or contact developers at: ${link( bugsUrl )}` )
			
			process.exit( 0 )
		
		},
	} ) 

}
