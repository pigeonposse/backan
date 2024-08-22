/**
 * Backan server.
 *
 * @description Vite config.
 * @see https://backan.pigeonposse.com/guide/server
 */

import { server } from '@backan/server'
import app    from './app'

server( { app } )
