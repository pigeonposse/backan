
import { server } from '../src/main'
import app        from './app'
import { port }   from '../vite.config'

await server( {
	app        : app,
	hostname   : 'localhost',
	protocol   : 'http',
	port       : port,
	autoPort   : true,
	allowFlags : true,
	onError    : async ( { id, error } ) => {
		
		if( id === 'UNEXPECTED' ) return console.error( '🐦💔 UNEXPECTED Error' )
		if( id === 'PORTS-NOT-AVAILABLE' ) console.error( '🐦💥🚢 No ports availables' )
		if( id === 'PORT-NOT-AVAILABLE' ) return console.error( '🐦💥🚢 No port available' )
		if( id === 'HOSTNAME-NOT-VALID' ) console.error( '🐦💥🌐 Hostname not available' )

		console.error( '\n',error )
	
	},
	onSuccess : async info => {

		console.info( '🐦✅ Server info', info )
	
	},
	onExit : async () => {

		console.warn( '\n\n🐦👋 Fly High Pigeon\n' )
	
	},
} )
