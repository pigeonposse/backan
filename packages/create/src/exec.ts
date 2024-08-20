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
