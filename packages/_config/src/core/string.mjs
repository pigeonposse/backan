// @ts-nocheck

import { readFile } from './fs.mjs'
import figlet     from 'figlet'
import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'

export const mdToHTML = string => marked( string )
export const printMD= async string => {
	marked.use(markedTerminal())
	return await marked.parse( string )
}

export const printMDFromPath= async path => {
	const content = await readFile(path)
	return await printMD( content ) 
}
export const generateASCII = ( projectName = '', collectiveName = 'PIGEON\nPOSSE', font = 'ANSI Shadow' ) => {

	return figlet.textSync( `${collectiveName}\n-------\n${projectName}` , {
		font,
		horizontalLayout : 'default',
		verticalLayout   : 'default',
		whitespaceBreak  : true,
	} )

}

export const constructorLinks = ( links, type = 'link' ) => {
	
	let res = ''
	links.forEach( ( link, index ) => {

		res += type === 'img' ? imgUrl( link ) : `[${link.name}](${link.url})`
		if ( index !== links.length - 1 ) res += '\n'

	} )
	return res

}

export const getCurrentDateTime = () => {

	const currentDate = new Date()
	const year        = currentDate.getUTCFullYear()
	const month       = ( '0' + ( currentDate.getUTCMonth() + 1 ) ).slice( -2 )
	const day         = ( '0' + currentDate.getUTCDate() ).slice( -2 )
	const hours       = ( '0' + currentDate.getUTCHours() ).slice( -2 )
	const minutes     = ( '0' + currentDate.getUTCMinutes() ).slice( -2 )
	const seconds     = ( '0' + currentDate.getUTCSeconds() ).slice( -2 )
	
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

}

export const imgUrl = ( { name, color = 'black', url, logo = false, type = false } ) => {
	
	if( !type ) type = `badge/${encodeURIComponent( name )}-${color}?`
	else type = `${type}?color=${color}&`
	
	const img = `https://img.shields.io/${type}style=for-the-badge${logo ? '&logo=' + encodeURIComponent( logo.toLowerCase() ) : ''}&logoColor=white`

	return `[![${name}](${img})](${url})`

}

export const object2string = data => JSON.stringify( data, null, '\t' ) + '\n'
