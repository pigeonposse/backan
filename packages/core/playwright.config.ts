/**
 * Playwright config.
 *
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-test
 */
import type { PlaywrightTestConfig } from '@playwright/test'
import { port }                      from './vite.config'

const config: PlaywrightTestConfig = {
	webServer : {
		command : 'pnpm dev',
		port,
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
}

export default config
