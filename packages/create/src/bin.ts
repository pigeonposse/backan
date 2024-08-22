#!/usr/bin/env node
import {
	text,
	select,
	group,
	intro,
	outro,
	cancel, 
	note,
	log,
} from '@clack/prompts'

import { 
	existsSpecificFlag, 
	getFlagValue, 
} from './flags'
import {
	homepage,
	INSTALL_OPTS,
	name,
	OPEN_OPTS, 
	OPTS,
	OPTS_DEFAULT,
	TEMPLATES,
	version, 
} from './const'
import {
	link, 
	green, 
	italic, 
	blue,
	gray, 
} from './color'
import { create } from './main'

import {
	existsPathSync, 
	resolvePath, 
} from './fs'

const flags = {
	[OPTS.NAME]     : getFlagValue( OPTS.NAME ), 
	[OPTS.TEMPLATE] : existsSpecificFlag( OPTS.TEMPLATE, TEMPLATES ),
	[OPTS.INSTALL]  : existsSpecificFlag( OPTS.INSTALL, INSTALL_OPTS ),
	[OPTS.OPEN]     : existsSpecificFlag( OPTS.OPEN, OPEN_OPTS ),
}

const isValidProjectName = ( name: string ): boolean => {

	// Solo permite letras, números, guiones y guiones bajos
	const regex = /^[a-zA-Z0-9_-]+$/
	return regex.test( name )

}
const cancelRes = () => {

	cancel( 'Hasta la vista. 👋' )
	process.exit( 0 )

}
await group( {
	'intro' : async () =>{

		console.log()
		await intro( '🔥 ' + name ) 
		await note( `Create Backan template project.\n\nVersion:       ${green( italic( version ) )}\nDocumentation: ${blue( link( homepage ) )}` )
	
	},

	[OPTS.NAME] : async () => {

		const defaultName = name.toLowerCase() + '-project'
		const flag        = flags[OPTS.NAME]
		const existsFlag  = flag !== undefined && existsPathSync( resolvePath( flag ) )

		if( existsFlag ) 
			log.warn( 'Input flag exists' )
		else if ( flag !== undefined && !existsFlag ) {

			log.success( `Name of project: ${gray( flag )}` )
			return flag
		
		}

		return await text( {
			message      : 'What is the name of the project?', 
			placeholder  : defaultName,
			initialValue : defaultName,
			validate     : v => {

				const n = isValidProjectName( v )
				if( !n ) return 'The project name contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed.'
				const inputDir    = resolvePath( v )
				const existsInput = existsPathSync( inputDir )

				if ( existsInput ) return `The project name "${v}" already exists. Please choose a different name.`
			
			},
		} ) 
		// try{

		// 	while ( !validName ) {

		// 		if ( projectName !== undefined ) {

		// 			log.success( `Name of project: ${gray( projectName )}` )
		// 			break
			
		// 		}

		// 		projectName = await text( {
		// 			message     : 'What is the name of the project?', 
		// 			placeholder : name.toLowerCase() + '-project',
		// 		} ) as string
 
		// 		if ( typeof projectName === 'string' ) {

		// 			if ( !isValidProjectName( projectName ) ) {

		// 				log.error( 'The project name contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed.' )
		// 				projectName = undefined // Reset to ask again
		// 				continue
				
		// 			}

		// 			const inputDir    = resolvePath( projectName )
		// 			const existsInput = await existsPath( inputDir )

		// 			if ( existsInput ) {

		// 				log.error( `The project name "${projectName}" already exists. Please choose a different name.` )
		// 				projectName = undefined // Reset to ask again
				
		// 			} else validName = true
			
		// 		}
		
		// 	}
		
		// }catch( _e ){

		// 	cancelRes( )
		
		// }

		// return projectName
	
	},

	[OPTS.TEMPLATE] : async () => {

		const flag = flags[OPTS.TEMPLATE]
		if( flag !== undefined ) {

			log.success( `Template selected: ${gray( flag )}` )
			return flag
		
		}
		return await select( {
			message : 'Which template would you like to use?',
			options : [
				{
					label : 'Demo', 
					value : TEMPLATES.DEMO, 
				},
				{
					label : 'Demo (Typescriot)', 
					// @ts-ignore
					value : TEMPLATES.DEMO_TS, 
				},
				{
					label : 'Skeleton', 
					// @ts-ignore
					value : TEMPLATES.SKELETON, 
				},
				{
					label : 'Skeleton (Typescriot)', 
					// @ts-ignore
					value : TEMPLATES.SKELETON_TS, 
				},
			],
			initialValue : OPTS_DEFAULT.TEMPLATE, 
		} )
		
	},
	[OPTS.INSTALL] : async () => {

		const flag = flags[OPTS.INSTALL]
		if( flag ) {

			log.success( `Project installation with: ${gray( flag )}` )
			return flag
		
		}

		return await select( {
			message : 'Would you like to automatically install dependencies?',
			options : [
				{
					label : 'None', 
					value : INSTALL_OPTS.NONE, 
				},
				{
					label : 'Use npm', 
					// @ts-ignore
					value : INSTALL_OPTS.NPM, 
				},
				{
					label : 'Use pnpm', 
					// @ts-ignore
					value : INSTALL_OPTS.PNPM, 
				},
				{
					label : 'use yarn', 
					// @ts-ignore
					value : INSTALL_OPTS.YARN, 
				},
			],
			initialValue : OPTS_DEFAULT.INSTALL,
		} )
		
	},
	
	[OPTS.OPEN] : async () => {

		const flag = flags[OPTS.OPEN]
		if( flag !== undefined ) {

			log.success( `Open project in an IDE or text editor: ${flag}` )
			return flag
		
		}

		return await select( {
			message : 'Would you like to open the project in an IDE or text editor?',
			options : [
				{
					label : 'None', 
					value : OPEN_OPTS.NONE, 
				},
				{
					label : 'Open in Visual Studio Code', 
					// @ts-ignore
					value : OPEN_OPTS.VSCODE, 
				},
				{
					label : 'Open in Sublime Text', 
					// @ts-ignore
					value : OPEN_OPTS.SUBLIME, 
				},
				{
					label : 'Open in WebStorm', 
					// @ts-ignore
					value : OPEN_OPTS.WEBSTORM, 
				},
			],
			initialValue : OPTS_DEFAULT.OPEN,
		} )
		
	},

	'process' : async ( { results } ) =>{
	
		await create( {
			name     : results.name || name.toLowerCase(),
			template : results.template,
			install  : results.install,
			open     : results.open,
		} )
		
	},
	
	'outro' : () => outro( 'Perfectly created project! ✨' ),

},{
	onCancel : ( ) => {

		cancelRes()
		
	},
} )

