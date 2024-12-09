import { defineConfig }         from '@dovenv/core'
import { config as bandaTheme } from '@dovenv/theme-banda'

import corePlugin from '../../.dovenv/core.js'

const sidebar = [
	{
		text  : 'Introduction',
		items : [
			{
				text : 'What is BACKAN?',
				link : '/guide/',
			},
		],
	},
	{
		text  : 'Reference',
		items : [
			{
				text      : '📚 Library',
				collapsed : false,
				items     : [
					{
						text : '🏁 Get started',
						link : '/guide/core/',
					},
					{
						text : 'App',
						link : '/guide/core/app',
					},
					{
						text : 'Route',
						link : '/guide/core/route',
					},
					{
						text      : 'Endpoints',
						collapsed : true,
						items     : [
							{
								text : 'GET',
								link : '/guide/core/get',
							},
							{
								text : 'POST',
								link : '/guide/core/post',
							},
							{
								text : 'STREAM',
								link : '/guide/core/stream',
							},
							{
								text : 'PUT',
								link : '/guide/core/put',
							},
							{
								text : 'DELETE',
								link : '/guide/core/delete',
							},
							{
								text : 'PATCH',
								link : '/guide/core/patch',
							},
						],
					},
				],
			},
			{
				text : '🎉 Create (setup)',

				link : '/guide/create/',
			},
			{
				text : '🗄️ Server',
				link : '/guide/server/',
			},
			{
				text : '📦 Builder',
				link : '/guide/builder/',
			},
		],
	},
]

const pkg = corePlugin.const.pkg
console.log( 'DOCUMENTATION' )

export default defineConfig(
	corePlugin,
	bandaTheme( { docs : {
		input           : '../../docs',
		output          : 'build',
		shortDesc       : pkg.extra.shortDesc,
		repoURL         : pkg.repository.url,
		name            : pkg.extra.productName,
		changelogURL    : pkg.extra.changelogURL,
		contributingURL : pkg.extra.contributingURL,
		npmURL          : pkg.repository.url,
		license         : {
			type : pkg.license,
			url  : pkg.extra.licenseURL,
		},
		moreURL : pkg.extra.collective.url,
		footer  : { links: pkg.extra.collective.social },
		sidebar : {
			'/guide/'       : sidebar,
			'/todo/'        : sidebar,
			'/contributors' : sidebar,
		},
		autoSidebar : {
			intro     : false,
			reference : false,
		},
		// vitepress: {
		// 	vite: {
		// 		build: {
		// 			rollupOptions: {
		// 			  external: ['vue/server-renderer', 'vue'],
		// 			},
		// 		},
		// 	}
		// }
	} } ),
)
