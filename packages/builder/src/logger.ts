export const logger = ( 
	{ 
		name,
		isDebug = false, 
	}: {
		name: string
		isDebug?:boolean
	}, 
) => ( {
	debug : ( data: object | string ) => isDebug && console.debug( '\n🔥⬛', data ),
	group : ( data: object | string ) => ( {
		start : () => {

			console.log( '\n🔥⬛', data )
			console.group( )
			
		},
		end : () => console.groupEnd( ),
	} )	,
	info    : ( data: object | string ) => console.log( `\n🔥🟦 [${name}]`, data ),
	success : ( data: object | string ) => console.log( `\n🔥✅ [${name}]`, data ),
	warn    : ( data: object | string ) => console.warn( `\n🔥🟡 [${name}]`, data ),
	error   : ( data: object | string ) => console.error( `\n🔥❌ [${name}]`, data ),
} )
