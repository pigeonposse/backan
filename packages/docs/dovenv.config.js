import { defineConfig } from '@dovenv/core'
import ppTheme          from '@dovenv/theme-pigeonposse'

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
				text : '🌐 Client',
				link : '/guide/client/',
			},
			{
				text : '📦 Builder',
				link : '/guide/builder/',
			},
		],
	},
]

export default defineConfig(
	ppTheme( {
		core : corePlugin,
		docs : async () => ( {
			input   : '../../docs',
			output  : 'build',
			sidebar : {
				'/guide/'       : sidebar,
				'/todo/'        : sidebar,
				'/contributors' : sidebar,
			},
			css : `
			:root {
				--vp-c-brand-1: var(--pp-brand-3) !important;
			}
			`,
			autoSidebar : {
				intro     : false,
				reference : false,
			},
			pwa : { manifest : { icons : [
				{
					src   : 'pwa-64x64.png',
					sizes : '64x64',
					type  : 'image/png',
				},
				{
					src   : 'pwa-192x192.png',
					sizes : '192x192',
					type  : 'image/png',
				},
				{
					src   : 'pwa-512x512.png',
					sizes : '512x512',
					type  : 'image/png',
				},
				{
					src     : 'maskable-icon-512x512.png',
					sizes   : '512x512',
					type    : 'image/png',
					purpose : 'maskable',
				},
			] } },
		} ),
	} ),
)
