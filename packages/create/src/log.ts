import { name } from './const'

export const log = {
	debug   : ( data: object | string ) => console.debug( `\n🔥⬛ [${name}]`, data ),
	info    : ( data: object | string ) => console.log( `\n🔥🟦 [${name}]`, data ),
	success : ( data: object | string ) => console.log( `\n🔥✅ [${name}]`, data ),
	warn    : ( data: object | string ) => console.warn( `\n🔥🟡 [${name}]`, data ),
	error   : ( data: object | string ) => console.error( `\n🔥❌ [${name}]`, data ),
}
