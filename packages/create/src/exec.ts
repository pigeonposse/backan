import { spawn } from 'node:child_process'

type ExecParams = {
    on: () => Promise<void>;
    onExit: () => Promise<void>;
    onError: ( error: unknown ) => Promise<void>;
};

export const exec = async ( { on, onExit, onError }: ExecParams ) => {

	process.on( 'exit', async function ( code ){

		if( code !== 130 ) return
		console.log( '\n' )
		return await onExit()
	
	} )

	try {

		await on()
		return
	
	}catch( e ){

		// @ts-ignore
		if( 'name' in e && e.name === 'ExitPromptError' ) return await onExit()
		await onError( e )
		return
	
	}

}
export const execCMD = async ( cmd: string ) => {

	// console.log( `🐢 CMD: ${cmd}` )
 
	await new Promise<void>( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell : true,
			stdio : 'inherit',
		} )

		// Manejar eventos del proceso hijo
		childProcess.on( 'close', code => {

			if ( code === 0 ) {

				// El proceso hijo terminó con éxito
				resolve()
				
			} else {

				// El proceso hijo falló
				const error = new Error( `Command failed with code ${code}` )
				console.error( error )
				reject( error )
				
			}
			
		} )
		
	} )

}
  
export const execBoolChildCMD = async ( cmd: string ): Promise<boolean> => {

	return new Promise( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell : true,
			stdio : 'pipe',
		} )

		childProcess.on( 'close', code => {

			if ( code === 0 ) resolve( true )
			else resolve( false ) 

		} )

		childProcess.on( 'error', err => {

			reject( err ) 

		} )

	} )

}
