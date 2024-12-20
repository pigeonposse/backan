/**
 * Readme.
 * @description Readme.
 */

import {
	pkg,
	addTextBetweenAMark,
	execProcess,
	readFile,
	existPath,
	joinPath,
	paths,
	joinUrl,
	createMDIndex,
} from '@backan/config/core'

import { readme } from './templates/readme.mjs'

await execProcess( {
	name : 'CHANGE README',
	on   : async ( ) => {

		const getContent = content => {

			content     = content.replace( /<video[^>]*>(.*?)<\/video>|<video[^>]*\/>/gs, '' )
			const lines = content.split( '\n' )
				.filter( line => !line.startsWith( ':::' ) ) // Filtrar líneas que no empiezan por ':::'
			const index = lines.findIndex( line => line.startsWith( '#' ) )
			return index === -1 ? content : lines.slice( index + 1 ).join( '\n' ).trim()

		}

		const replaceRelativeUrls = ( inputString, baseUrl, basePath ) => {

			const regex = /(src="|]\()(\.{1,2}|\/)([^\s'")]+)/g

			const result = inputString.replace( regex, ( match, prefix, relativeType, path ) => {

				path = path.replace( /\.md$/, '' )
				// console.log( {
				// 	prefix,baseUrl, path, relativeType,
				// } )
				if ( relativeType === '/' ) return prefix + '' + joinUrl( baseUrl, path )

				if ( relativeType === '..' ) return prefix + '' + joinUrl( baseUrl, basePath.split( '/' )[0], path )

				return prefix + '' + joinUrl( baseUrl, basePath, path )

			} )

			return result

		}
		const readmeTemp = readme( pkg )

		const convertReadme = async id => {

			const filePath      = id === 'monorepo' ? 'README.md' : joinPath( paths.workspaceDir, 'packages', id, 'README.md' )
			const docsPathID    = id === 'backan' ? 'core' : id
			const docsPath      = joinPath( paths.workspaceDir, 'docs', 'guide', docsPathID, 'index.md' )
			const docsIndexPath = joinPath( paths.workspaceDir, 'docs', 'guide', 'index.md' )
			const existsDocs    = await existPath( docsPath )

			if ( existsDocs ) {

				let content = replaceRelativeUrls(
					getContent( await readFile( docsPath ) ),
					pkg.data.homepage,
					joinPath( 'guide', docsPathID ),
				)

				if ( docsPathID === 'core' ) {

					content = content + '\n\n## What is BACKAN?\n\n' + replaceRelativeUrls(
						getContent( await readFile( docsIndexPath ) ),
						pkg.data.homepage,
						joinPath( 'guide' ),
					)
					content =  createMDIndex( content ) + '\n\n' + content

				}
				await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START DOCS -->', '<!-- PIGEONPOSSE END DOCS -->', content )

			}
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START MARK -->', '<!-- PIGEONPOSSE END MARK -->', readmeTemp.mark )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START CONTENT -->', '<!-- PIGEONPOSSE END CONTENT -->', readmeTemp.content )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START INDEX -->', '<!-- PIGEONPOSSE END INDEX -->', readmeTemp.index )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START ORG -->', '<!-- PIGEONPOSSE END ORG -->', readmeTemp.org )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START HEADER -->', '<!-- PIGEONPOSSE END HEADER -->', readmeTemp.header )

		}

		const ids = [
			'monorepo',
			'_config',
			'backan',
			'builder',
			'core',
			'create',
			'docs',
			'server',
		]

		for ( const id of ids ) {

			await convertReadme( id )

		}

	},
} )

