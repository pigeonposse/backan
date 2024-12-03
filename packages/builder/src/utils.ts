
import { spawn } from 'node:child_process'
import {
	mkdir,
	writeFile as fsWriteFile,
	access,
	unlink,
	stat,
	rm,
} from 'node:fs/promises'
import {
	parse,
	dirname,
	join,
	resolve,
} from 'node:path'
import * as url from 'node:url'

export const packageDir = url.fileURLToPath( new URL( '..', import.meta.url ) )

export const joinPath = join
export const resolvePath = resolve
export const getFilename = ( path: string ) => {

	const { name } = parse( path )
	return name.endsWith( '.' ) ? name.slice( 0, -1 ) : name

}
export const getDirname = dirname
export const deleteFile = async ( path: string ) => {

	await unlink( path )

}
export const existsPath = async ( path: string ) => {

	try {

		await access( path )
		return true

	}
	catch ( _e ) {

		return false

	}

}
export const writeFile = async ( path: string, data: string ) => {

	const dir = getDirname( path )

	await mkdir( dir, { recursive: true } )

	await fsWriteFile( path, data, 'utf8' )

}

export const exec = async ( cmd: string ) => {

	await new Promise<void>( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell : true,
			stdio : 'inherit',
		} )

		childProcess.on( 'close', code => {

			if ( code === 0 ) resolve()
			else {

				const error = new Error( `Command failed with code ${code}` )
				console.error( error )
				reject( error )

			}

		} )

	} )

}

export const removePathIfExist = async ( path: string ) => {

	try {

		// Check if the path exists
		const stats = await stat( path )

		if ( stats.isDirectory() ) {

			// If it's a directory, delete it recursively
			await rm( path, {
				recursive : true,
				force     : true,
			} )
			// console.log( `Directory ${path} successfully deleted.` )

		}
		else if ( stats.isFile() ) {

			// If it's a file, delete it
			await unlink( path )
			// console.log( `File ${path} successfully deleted.` )

		}

	}
	catch ( error ) {

		// @ts-ignore
		// `The directory or file ${path} does not exist.`
		if ( error.code === 'ENOENT' ) return
		else console.error( `Error deleting ${path}:`, error )

	}

}
