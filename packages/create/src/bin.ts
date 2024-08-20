
import {
	text,
	select,
	group,
	intro,
	outro,
	cancel, 
	spinner,
	note,
	log,
} from '@clack/prompts'
import { 
	existsSpecificFlag, 
	getFlagValue, 
} from './flags'
import {
	INSTALL_OPTS,
	name,
	OPEN_OPTS, 
	OPTS,
	OPTS_DEFAULT,
	TEMPLATES, 
} from './const'
import { create } from './main'

const flags = {
	[OPTS.NAME]     : getFlagValue( OPTS.NAME ), 
	[OPTS.TEMPLATE] : existsSpecificFlag( OPTS.TEMPLATE, TEMPLATES ),
	[OPTS.INSTALL]  : existsSpecificFlag( OPTS.INSTALL, INSTALL_OPTS ),
	[OPTS.OPEN]     : existsSpecificFlag( OPTS.OPEN, OPEN_OPTS ),
}

await group( {
	'intro' : async () =>{
 
		await intro( '🔥 ' + name ) 
		await note( 'Create template project' )
	
	},

	[OPTS.NAME] : async () => {

		const flag = flags[OPTS.NAME]
		if( flag !== undefined ) {

			log.success( `Name of project: ${flag}` )
			return flag
		
		}
		return await text( {
			message     : 'What is the name of the project?', 
			placeholder : name.toLowerCase() + '-project',
		} )
		
	},

	[OPTS.TEMPLATE] : async () => {

		const flag = flags[OPTS.TEMPLATE]
		if( flag !== undefined ) {

			log.success( `Template selected: ${flag}` )
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
					label : 'Skeleton', 
					// @ts-ignore
					value : TEMPLATES.SKELETON, 
				},
			],
			initialValue : OPTS_DEFAULT.TEMPLATE, 
		} )
		
	},
	[OPTS.INSTALL] : async () => {

		const flag = flags[OPTS.INSTALL]
		if( flag !== undefined ) {

			log.success( `Install project: ${flag}` )
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

			log.success( `Open  project in an IDE or text editor: ${flag}` )
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

		const s = spinner()

		s.start( 'Creating processs' )
	
		await create( {
			name     : results.name || name,
			template : results.template,
			install  : results.install,
			open     : results.open,
		} )

		s.stop( 'Installed via pnpm' )
		
	},

	'outro' : () => outro( 'Successfully !' ),

},{
	onCancel : ( ) => {

		cancel( 'Operation cancelled.' )
		process.exit( 0 )
		
	},
} )
