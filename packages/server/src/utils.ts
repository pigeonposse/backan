export const getFlagValue = ( key: string ) =>{

	const flags = process.argv
	for ( const flag of flags ) {

		if ( flag.startsWith( `--${key}=` ) ) return flag.split( '=' )[1]
	
	}
	return undefined

}
export const existsFlag = ( v: string ) => process.argv.includes( `--${v}` )
