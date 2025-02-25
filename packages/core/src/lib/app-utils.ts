export { swaggerUI } from '@hono/swagger-ui'
export { cache } from 'hono/cache'
export { cors } from 'hono/cors'
export { hc as createClient } from 'hono/client'
export {
	appendTrailingSlash,
	trimTrailingSlash,
} from 'hono/trailing-slash'
export {
	env,
	getRuntimeKey,
} from 'hono/adapter'
export { secureHeaders } from 'hono/secure-headers'
export { ipRestriction } from 'hono/ip-restriction'
export { compress } from 'hono/compress'
export { timeout } from 'hono/timeout'
export { bodyLimit } from 'hono/body-limit'
export { prettyJSON } from 'hono/pretty-json'
export {
	some,
	every,
	except,
} from 'hono/combine'
export {
	contextStorage,
	getContext,
} from 'hono/context-storage'
export {
	getCookie,
	getSignedCookie,
	setCookie,
	setSignedCookie,
	deleteCookie,
} from 'hono/cookie'
export * from './validate'

export const getConnInfo = async ( type: 'bun' | 'deno' | 'cf-workers' | 'vercel' ) => {

	if ( type === 'bun' ) return ( await import( 'hono/bun' ) ).getConnInfo
	else if ( type === 'deno' ) return ( await import( 'hono/deno' ) ).getConnInfo
	else if ( type === 'cf-workers' ) return ( await import( 'hono/cloudflare-workers' ) ).getConnInfo
	else if ( type === 'vercel' ) return ( await import( 'hono/vercel' ) ).getConnInfo
	else return undefined

}
