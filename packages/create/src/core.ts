import {
	Creatium,
	prompt,
	style,
} from 'creatium'
import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

import {
	name,
	version,
	homepage,
	description,
} from '../../backan/package.json'
import {
	version as ProjectVersion,
	name as projectName,
} from '../package.json'

const {
	color, table,
}                   = style
const {
	log, box, intro, outro, cancel,
} = prompt

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const dataDir      = join( currentDir, '..', 'data' )
const templatesDir = join( dataDir, 'templates' )

/** Templates ID. Identifiers values are equal to folder names. */
export const TEMPLATE = {
	DEMO        : 'demo',
	DEMO_TS     : 'demo-ts',
	SKELETON    : 'skeleton',
	SKELETON_TS : 'skeleton-ts',
} as const

const setTable = ( v: Parameters<typeof table>[0] ) => table( v, {
	drawHorizontalLine : () => false,
	drawVerticalLine   : () => false,
} )

export const core = new Creatium( {
	name     : projectName,
	version  : ProjectVersion,
	consts   : { version },
	onCancel : () => {

		log.step( '' )
		cancel( color.red( 'Process closed 💔' ) )
		process.exit( 0 )

	},
	templates : {
		[TEMPLATE.DEMO] : {
			input : join( templatesDir, TEMPLATE.DEMO ),
			name  : 'Backan demo with JavaScript',
		},
		[TEMPLATE.DEMO_TS] : {
			input : join( templatesDir, TEMPLATE.DEMO_TS ),
			name  : 'Backan demo with TypeScript',
		},
		[TEMPLATE.SKELETON] : {
			input : join( templatesDir, TEMPLATE.SKELETON ),
			name  : 'Backan skeleton with JavaScript',
		},
		[TEMPLATE.SKELETON_TS] : {
			input : join( templatesDir, TEMPLATE.SKELETON_TS ),
			name  : 'Backan skeleton with TypeScript',
		},
	},
	intro : () => {

		console.log()
		intro( color.cyan.inverse( ` ${name} ` ) + '  🔥' )
		log.step( '' )

		const value =  `${setTable( [ [ description ] ] )}\n${setTable( [ [ 'Package version', color.green( version ) ], [ 'Documentation', color.blue.italic.underline( homepage ) ] ] )}`

		box( {
			value : color.dim( value ),
			opts  : {
				padding     : 0,
				borderStyle : 'none',
				dimBorder   : true,
			},
		} )

	},
	outro : () => outro( `Let's work with ${style.color.green( name )} 🔥` ),
} )
