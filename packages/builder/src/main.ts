import {
	buildDeno,
	buildNode,
	build,
	buildAuto,
	BINARIUM_CONSTS,
	defineConfig,
} from 'binarium'

import { bin } from '../package.json'

BINARIUM_CONSTS.icon = '🔥'
BINARIUM_CONSTS.name = Object.keys( bin )[0].toUpperCase()

export {
	defineConfig,
	buildDeno,
	buildNode,
	build,
	buildAuto,
}

export { buildSchema } from './schema'
export { buildMD } from './md'

export type * from './types'
