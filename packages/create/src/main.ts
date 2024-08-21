/**
 * PACKAGE FILE.
 *
 * @description File with build function.
 */

import {
	cancel,
	log, note,
	outro,
	spinner, 
}        from '@clack/prompts'
import { CreateError }      from './error'
import {
	ERROR_ID, OPTS_DEFAULT, 
} from './const'
import {
	exec, execBoolChildCMD, execCMD, 
}     from './exec'
import {
	changeJSONvalues,
	copyDir,
	existsPath, resolvePath, 
} from './fs'
import type {
	CreateErrorData, 
	CreateParams, 
} from './types'
import { green } from './color'

export const create = async ( {
	name = OPTS_DEFAULT.NAME,
	install = OPTS_DEFAULT.INSTALL,
	template = OPTS_DEFAULT.TEMPLATE,
	open = OPTS_DEFAULT.OPEN,
}: CreateParams ) =>{
 
	const s = spinner()
	await exec( {
		on : async () => {

			const data: CreateErrorData = {
				opts : {
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
			const inputDir    = resolvePath( name )
			const existsInput = await existsPath( inputDir )
			data.inputDir     = inputDir
			if( existsInput ) throw new CreateError( ERROR_ID.EXIST_INPUT_DIR, data )
		
			// EXISTS TEMPLATE
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

					console.error( _e )
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

					failedOpen = true
		
				}
		
			s.stop( 'Construction completed!' )

			// IF fails
			const titleInit = 'Init commands'
			const initcmd   = install ? install + ' dev' : ''
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
			note( `${initcmd}`,titleInit )
			outro( `🔥 Let's work with ${green( 'backan' )} 🔥` )
			process.exit( 0 )
	
		},
		onExit : async () => {

			log.warn( 'Process cancelled 👋' )
			s.stop()
			return
		
		},
		onError : async e => {

			let erorData: Record<string, string | unknown> 
			if( !( e instanceof CreateError ) || e.message === ERROR_ID.UNEXPECTED ) erorData = {
				message : 'Unexpected error',
				data    : e,
			}
			else if( e.message === ERROR_ID.NAME_UNDEFINED ) erorData = {
				message : 'name option must exists',
				// @ts-ignore
				data    : e.data || e,
			} 
			else if( e.message === ERROR_ID.EXIST_INPUT_DIR ) erorData =  {
			// @ts-ignore
				message : `Can not create project. Input dir [${e.data.inputDir}] already exists`,
				// @ts-ignore
				data    : e.data || e,
			} 
			else if( e.message === ERROR_ID.TEMPLATE_NO_EXIST ) erorData = {
				// @ts-ignore
				message : `Template path [${e.data.templateDir}] does not exists`,
				// @ts-ignore
				data    : e.data || e,
			}
			else erorData =  {
				message : e.message,
				// @ts-ignore
				data    : e.data || e,
			} 

			// s.stop( JSON.stringify( erorData ), 1 )
			s.stop( 'Process closed 💔', 1 )
			//@ts-ignore
			// cancel( 'Error: ' + object2string( erorData ) )
			log.step()
			cancel( 'Error: ' + erorData.message )
			process.exit( 0 )
		
		},
	} ) 

}
