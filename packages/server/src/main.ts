import { serve }                         from '@hono/node-server'
import type {
	ServerError, ServerInfo, ServerOpts, 
} from './types'
import { SERVER_ERROR }       from './const'
import {
	existsFlag, getFlagValue, 
} from './utils'

const getProtocol                                    = ( port:number ) => port === 443 ? 'https' : 'http' 
const getUrl                                         = ( info: Omit<ServerInfo, 'url'> ) => `${info.protocol}://${info.hostname}:${info.port}`
const setDefaultError: ServerOpts<object>['onError'] = async ( { id, error, data } ) => {

	// if( id == SERVER_ERROR.EXIT ) 
	// 	console.warn( '👋 Goodbye amigo!' )
	if ( id === SERVER_ERROR.PORT_NOT_AVAILABLE ) 
		console.error( `💥🚢 Port ${data.port} is already in use. Please choose a different port.` )
	else if ( id === SERVER_ERROR.PORTS_NOT_AVAILABLE ) 
		console.error( `💥🚢 Ports from ${data.port} to ${data.port + 500 } are already in use. Please choose a different port.` )
	else if( id === SERVER_ERROR.HOSTNAME_NOT_VALID ) console.error( `💥🌐 Hostname [${data.hostname}] not available` )
	else if( id == SERVER_ERROR.UNEXPECTED )
		console.error( '💔 Unexpected error', error )
	else
		console.error( '💔 Internal error', error )

}

const setError = async ( { err, data, onError }:{err:unknown, data: ServerInfo, onError: ServerOpts<object>['onError'] } ) =>{

	const noMessage = !err || typeof err !== 'object' || !( 'message' in err ) || typeof err.message !== 'string'
	// const noName        = !err || typeof err !== 'object' || !( 'name' in err ) || typeof err.name !== 'string'
	const messageServer = !noMessage && ( Object.values( SERVER_ERROR ) as string[] ).includes( err.message as string )
	// const onExit        = !noName && err.name === 'ExitPromptError'
	const errorData = {
		id    : ( messageServer ? err.message : SERVER_ERROR.UNEXPECTED ) as ServerError,
		error : err,
		data,
	}
	
	if ( onError ) return await onError( errorData )
	else return await setDefaultError( errorData )

}

const tryServe = async <Env extends object>(
	opts: ServerOpts<Env>,
	port: number,
	hostname: string,
): Promise<void> => {
	
	return new Promise( ( resolve, reject ) => {

		const protocol = opts.protocol || getProtocol( port )

		serve( {
			hostname,
			fetch : opts.app.fetch,
			port  : port,
		}, async info => {

			const data = {
				protocol,
				hostname,
				port : info.port,
			}

			const url = getUrl( data )
			
			if ( opts.onSuccess ) 
				await opts.onSuccess( {
					url,
					...data,
				} )
			else console.log( `✅ Listening on ${url}` )

			resolve()
		
		} ).on( 'error', async err => {

			// if( err.name === 'ExitPromptError' ) reject( new Error( SERVER_ERROR.EXIT ) )
			if( err.code === 'ENOTFOUND' && err.syscall === 'getaddrinfo' ) reject( new Error( SERVER_ERROR.HOSTNAME_NOT_VALID ) )
			if ( err.code === 'EADDRINUSE' ) reject( new Error( SERVER_ERROR.PORT_NOT_AVAILABLE ) )
			else reject( err )
		
		} )
	
	} )

}

/**
 * Starts a node server with BACKAN.
 *
 * @template Env - The environment type.
 * @param   {ServerOpts<Env>} opts - The server options.
 * @returns {Promise<void>}        - Resolves when the server starts successfully, or rejects if an error occurs.
 * @see https://backan.pigeonposse.com/guide/server
 * @example 
 * import app from './backan-app.js'
 * server({
 *     app: app,
 *     port: 3000, // default app.port || 80
 * });
 */
export const server = async <Env extends object>( opts: ServerOpts<Env> ) => {

	const maxAttempts = 500
	const allowFlags  = opts.allowFlags || false

	const autoPortFlag = allowFlags ? existsFlag( 'autoPort' ) : undefined
	const hostnameFlag = allowFlags ? getFlagValue( 'hostname' ) : undefined
	const protocolFlag = allowFlags ? getFlagValue( 'protocol' ) : undefined
	const portFlag     = allowFlags ? Number( getFlagValue( 'port' ) ) : undefined
	
	const hostname   = hostnameFlag || opts.hostname || 'localhost'
	const defautPort = portFlag || opts.port || 80
	const autoPort   = autoPortFlag || opts.autoPort || false
	const protocol   = protocolFlag || opts.protocol || getProtocol( defautPort )
	
	const data = {
		protocol,
		hostname,
		port : defautPort,
	}
	
	const serverData = {
		...data,
		url : getUrl( data ),
	}

	process.on( 'exit', async function ( code ){

		if( code !== 130 ) return

		if ( opts.onExit ) return await opts.onExit( {
			data : serverData,
		} )
		else return await console.warn( '👋 bye bye' )
	
	} )

	try {

		let port = defautPort,
			attempts = 0,
			loop     = true

		while ( loop && attempts < maxAttempts ) {
		
			try {

				await tryServe<Env>( opts, port, hostname )
				loop = false
				break // Server started successfully, exit loop
			
			} catch ( err ) {

				attempts++
				const noMessage = !err || typeof err !== 'object' || !( 'message' in err ) || typeof err.message !== 'string'
				if ( !noMessage && err.message === SERVER_ERROR.PORT_NOT_AVAILABLE && autoPort ) {

					port += 1 // Try next port
				
				} else {

					loop = false
					throw err // Re-throw unexpected errors or if autoPort is false
				
				}
			
			}

			if ( attempts >= maxAttempts ) throw new Error( SERVER_ERROR.PORTS_NOT_AVAILABLE )
		
		}
	
	} catch ( err ) {

		return await setError( {
			err,
			data    : serverData,
			onError : opts.onError,
		} )
	
	}

}

