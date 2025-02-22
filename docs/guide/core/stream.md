# Create `STREAM` *endpoint*

<!--@include: ../../partials/coming-soon.md-->

## Usage

```ts twoslash

import { Route }  from 'backan'
import { stream } from 'backan/stream'

const id    = 'loop'
const route = new Route( { path: id } )

route.add(
 {
  method    : 'post',
  path      : '/',
  request   : { body: { content: { 'application/json': { schema: route.validation.object( { loop: route.validation.number() } ) } } } },
  responses : {
   200 : route.response.responseStreamSuccess( route.validation.string() ),
   400 : route.response.responseJSONError400,
   500 : route.response.responseJSONError500,
  },
  tags : [ id ],
 },
 // @ts-ignore
 async c => {

  try {

   const json = c.req.valid( 'json' )

   return await stream(
    c,
    async stream => {

     const write = async ( data: string, success = true ) => {

      await stream.writeln(
       JSON.stringify( {
        success,
        data,
       } ),
      )

     }

     stream.onAbort( async () =>
      await write( 'aborted', false ),
     )

     for ( let i = 0; i < json.loop; i++ ) {

      await write( i.toString() )

     }

     await stream.close()

    },
    async ( e, stream ) => {

     await stream.writeln(
      JSON.stringify( route.response.add400ErrorObject( e ) ),
     )

    },
   )

  }
  catch ( e ) {

   return route.response.add400Error( c, e )

  }

 },
)

export default route

```
