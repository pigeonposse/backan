# Create `POST` *endpoint*

<!--@include: ../../partials/coming-soon.md-->

## Usage

```ts twoslash
import { Route } from 'backan'

const id    = 'form'
const route = new Route( { path: id } )

const {
 validation, response,
} = route

route.add(
 {
  method  : 'post',
  path    : '/',
  request : { body : { content : { 'multipart/form-data' : { schema : validation
   .object( {
    foo   : validation.string(),
    bar   : validation.string(),
    image : validation.instanceof( File ).or( validation.string() ).openapi( {
     type   : 'string',
     format : 'binary',
    } ),
   } )
   .openapi( { required: [ 'foo' ] } ) } } } },
  responses : {
   200 : response.responseJSONSuccess( validation.object( {
    foo   : validation.string(),
    bar   : validation.string().nullable(),
    image : validation.string().nullable(),
   } ) ),
   400 : response.responseJSONError400,
   500 : response.responseJSONError500,
  },
  tags : [ id ],
 },
 async c => {

  const {
   foo, bar, image,
  } = c.req.valid( 'form' )

  if ( image instanceof File ) {
   // save file code here
  }

  return c.json(
   {
    foo,
    bar,
    image : image instanceof File ? image.name : null,
   },
   200,
  )

 },
)

export default route

```
