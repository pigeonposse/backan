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
			autoSidebar : {
				intro     : false,
				reference : false,
			},
		} ),
	} ),
)
