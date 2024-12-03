// @ts-ignore
import { createClient } from '../src/client'

import type { paths } from './schema/openapi.d.ts' // Generate with buildSchema

const client = createClient<paths>( { baseUrl: 'http://localhost:1312/' } )

// example of call
const response = await client.GET( '/random/child', { params: { query: { value: 'holaaaa' } } } )

console.log( response )
/* Response must be like:
{
  data: { child: true },
  response: Response {
    status: 200,
    statusText: 'OK',
    headers: Headers {
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '14',
      date: 'Fri, 13 Sep 2024 10:31:21 GMT',
      connection: 'keep-alive',
      'keep-alive': 'timeout=5'
    },
    body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
    bodyUsed: true,
    ok: true,
    redirected: false,
    type: 'basic',
    url: 'http://localhost:1312/random/child?value=holaaaa'
  }
}
*/

export { client }
