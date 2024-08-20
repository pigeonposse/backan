export const getFlagValue = ( key: string ) =>{

	const flags = process.argv
	for ( const flag of flags ) {

		if ( flag.startsWith( `--${key}=` ) ) return flag.split( '=' )[1]
	
	}
	return undefined

}
export const existsFlag = ( v: string ) => process.argv.includes( `--${v}` )
export const existsSpecificFlag = <VALUES>( v: string, values: Record<string, VALUES> ): VALUES | undefined => {

	const value = getFlagValue( v ) 
	
	if ( value && ( Object.values( values ) as unknown[] ).includes( value ) ) 
		return value as VALUES

	return undefined

}
