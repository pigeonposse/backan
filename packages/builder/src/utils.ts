
import {
	mkdir, 
	writeFile as fsWriteFile, 
	access,
	unlink,
} from 'node:fs/promises'
import {
	arch, platform, 
} from 'node:os'
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

export const getArch = () => {

	const architecture = arch()
	
	switch ( architecture ) {

		case 'arm64' :
			return 'arm64'
		case 'arm' :
			return 'arm64'
		case 'x64' :
			return 'x64'
		default :
			return 'unknown'
	
	}

}

export const getPlatform = async () => {

	const p = platform()

	switch ( p ) {

		case 'win32' :
			return 'win'
		case 'darwin' :
			return 'macos'
		case 'linux' :
			return 'linux'
		default :
			return 'unknown'
	
	}

}

export const getFlagValue = ( key: string ) =>{

	const flags = process.argv
	for ( const flag of flags ) {

		if ( flag.startsWith( `--${key}=` ) ) return flag.split( '=' )[1]
	
	}
	return undefined

}
export const existsFlag = ( v: string ) => process.argv.includes( `--${v}` )
