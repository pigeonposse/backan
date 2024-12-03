# Create `route` instace

<!--@include: ../../partials/coming-soon.md-->

## Usage

```ts twoslash
import { Route } from 'backan';

const id    = 'random'
const route = new Route( {
 path : id,
} )

route.add(
 {
  method    : 'get',
  path      : '/',
  summary   : 'Test route with response json',
  responses : {
   200 : route.response.responseJSONSuccess( route.validation.object( {
    fact : route.validation.string(),
   } ) ),
   400 : route.response.responseJSONError400,
   500 : route.response.responseJSONError500,
  },
  tags : [
   id,
  ],
 },
 async c => {

  try {

   const getRandomFact = async () => {

    try {

     const response = await fetch( 'https://uselessfacts.jsph.pl/random.json?language=en' )

     if ( !response.ok ) throw new Error( 'Network response was not ok' )

     const data = await response.json()

     if(typeof data.text !== 'string') throw new Error( 'Network response is no a string' )

     return data.text as string

    } catch ( error ) {

     console.error( 'Error fetching the random fact:', error )
     return 'Could not fetch a random fact at this time.'

    }

   }
   return route.response.addSuccessResponse( c, {
    fact : await getRandomFact(),
   } )

  } catch ( e ) {

   return route.response.add500Error( c, e )

  }

 },
)

```

## Parameters

```ts twoslash
export type RouteParams<Path extends string> = {
 /**
  * The path of the route.
  *
  * @example 'users'
  */
 path: Path
}
```
