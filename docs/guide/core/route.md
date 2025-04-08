# Create `route` instace

## Usage

```ts twoslash
import { App } from 'backan';

const route = new App( )

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
   'random',
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

## Route method

You can add a App instance as a route to the application using the `route` method.

```ts
import { App } from 'backan';
import myChildApp from './child'

const app = new App( )

app.route( '/child', myChildApp )

export default app
```
