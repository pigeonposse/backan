import {
	stream, 
	streamText, 
	streamSSE, 
} from 'hono/streaming'
import * as utils from './hook'

/* eslint-disable jsdoc/check-tag-names */

export { 
	/**
	 * Utils for stream.
	 *
	 * @see https://backanpigeonposse.com/guide/core/stream
	 */
	utils,
	/**
	 * It returns a simple streaming response as Response object.
	 *
	 * @see https://backanpigeonposse.com/guide/core/stream
	 */
	stream,
	/**
	 * It returns a streaming response with Content-Type:text/plain, Transfer-Encoding:chunked, and X-Content-Type-Options:nosniff headers.
	 *
	 * @see https://backanpigeonposse.com/guide/core/stream
	 * @experimental
	 */
	streamText,
	/**
	 * It allows you to stream Server-Sent Events (SSE) seamlessly.
	 *
	 * @see https://backanpigeonposse.com/guide/core/stream
	 * @experimental
	 */
	streamSSE,
}
