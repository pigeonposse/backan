export const getRandomFact = async ( lang = 'en' ) => {

	try {

		const response = await fetch( `https://uselessfacts.jsph.pl/random.json?language=${lang}` )

		if ( !response.ok ) throw new Error( 'Network response was not ok' )

		const data = await response.json()
		return data.text
	
	} catch ( error ) {

		console.error( 'Error fetching the random fact:', error )
		return 'Could not fetch a random fact at this time.'
	
	}

}
