/**
 * PACKAGE FILE.
 *
 * @description File with build function.
 */
import {
	build, BINARIUM_CONSTS, 
} from 'binarium'
import { extra } from '../../../package.json'

BINARIUM_CONSTS.name = extra.libraryId.toUpperCase()

export { build }

export { buildSchema } from './schema'
export { buildMD } from './md'
export { createClient } from './client'
export type * from './types'
