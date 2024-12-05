import {
	exec,
	joinPath,
	getCurrentDir,
} from '@dovenv/core/utils'

const cmd = `node ${joinPath( getCurrentDir( import.meta.url ), '..', 'dist', 'bin.js' )}`

console.log( 'Print help\n' )
await exec( `${cmd} --help` )

console.log( '\n\nExecute line\n\n' )
await exec( cmd )
