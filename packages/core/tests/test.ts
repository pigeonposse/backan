/**
 * Test files.
 *
 * @description Test files.
 * @see https://playwright.dev/docs/api/class-test
 */

import {
	expect, test,
} from '@playwright/test'

test( 'Server is healthy', async ( { page } ) => {

	const response = await page.request.get( '/health' )
	expect( response.ok() ).toBe( true )
	const responseData = await response.json()
	expect( responseData.ok ).toBe( true )
	expect( responseData.customValue ).toBe( false )

} )
