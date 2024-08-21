
import {
	mkdir, 
	writeFile as fsWriteFile, 
	access,
	unlink,
	readdir,
	copyFile,
	readFile as fsReadFile, 
} from 'node:fs/promises'
import {
	parse,
	dirname,
	join, 
	resolve, 
} from 'node:path'

export const readJSON =  async ( path: string ) => JSON.parse( await readFilke( path ) )
export const readFilke = async ( path: string ) => await fsReadFile( path, 'utf8' )
export const object2string = ( data: string ) => JSON.stringify( data, null, '\t' ) + '\n'
export const changeJSONvalues = async ( 
	path: string, 
	newValues: Record<string,string>, 
) => {

	const data = await readJSON( path )

	Object.keys( newValues ).forEach( key => {

		if ( data[key] !== undefined ) data[key] = newValues[key]
	
	} )

	await writeFile( path, object2string( data ) )

}

export const copyDir = async ( src: string, dest: string ) => {

	try {

		const entries = await readdir( src, {
			withFileTypes : true, 
		} )

		await mkdir( dest, {
			recursive : true, 
		} )

		const promises = entries.map( async entry => {

			const srcPath  = joinPath( src, entry.name )
			const destPath = joinPath( dest, entry.name )

			if ( entry.isDirectory() ) return await copyDir( srcPath, destPath )
			return await copyFile( srcPath, destPath )
		
		} )

		await Promise.all( promises )
	
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `📁 Error copying directory: ${error.message}` )
	
	}

}

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

