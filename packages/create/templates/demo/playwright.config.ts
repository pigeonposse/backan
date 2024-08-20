/**
 * Playwright config.
 *
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-testconfig
 */
import { defineConfig } from '@playwright/test'

export default defineConfig( {
	webServer : {
		command : 'vite dev -- --port=13121',
		port    : 13121,
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
} )
