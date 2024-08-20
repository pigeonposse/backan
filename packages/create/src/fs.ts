
import {
	mkdir, 
	writeFile as fsWriteFile, 
	access,
	unlink,
} from 'node:fs/promises'

import {
	parse,
	dirname,
	join, 
	resolve, 
} from 'node:path'

export const joinPath = join
export const resolvePath = resolve
export const getFilename = ( path: string ) => {

	const { name } = parse( path )
	return name.endsWith( '.' ) ? name.slice( 0, -1 ) : name

}

export const deleteFile = async( path: string ) => {

	await unlink( path )

}
export const existsPath = async ( path: string ) =>{

	try {

		await access( path )
		return true
	
	} catch ( _e ) {

		return false
	
	}

}

export const writeFile = async ( path: string, data: string ) => {

	const dir = dirname( path )
        
	await mkdir( dir, {
		recursive : true, 
	} )

	await fsWriteFile( path, data, 'utf8' )

}

