import {
	funding, extra, bugs, repository,
} from '../package.json'
import {
	joinPath, joinUrl, 
}                                     from '@backan/config/core'

const sidebarConstructor = [
	{
		text  : 'Introduction',
		items : [
			{
				text : 'What is BACKAN?', link : joinPath( extra.docsPath.guide,'/' ), 
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
						link : joinPath( extra.docsPath.core ), 
					},
					{
						text : 'App',
						link : joinPath( extra.docsPath.core, 'app' ), 
					},
					{
						text : 'Route',
						link : joinPath( extra.docsPath.core, 'route' ), 
					},
					{
						text      : 'Endpoints',
						collapsed : true,
						items     : [
							{
								text : 'GET',
								link : joinPath( extra.docsPath.core, 'get' ), 
							},
							{
								text : 'POST',
								link : joinPath( extra.docsPath.core, 'post' ), 
							},
							{
								text : 'STREAM',
								link : joinPath( extra.docsPath.core, 'stream' ), 
							},
							{
								text : 'PUT',
								link : joinPath( extra.docsPath.core, 'put' ), 
							},
							{
								text : 'DELETE',
								link : joinPath( extra.docsPath.core, 'delete' ), 
							},
							{
								text : 'PATCH',
								link : joinPath( extra.docsPath.core, 'patch' ), 
							},
						],
					},
				],
			},
			{ 
				text : '🎉 Create (setup)', 
				link : joinPath( extra.docsPath.create, 'index.md' ), 
			},
			{ 
				text : '🗄️ Server', 
				link : joinPath( extra.docsPath.server, 'index.md' ), 
			},
			{ 
				text : '📦 Builder', 
				link : joinPath( extra.docsPath.builder, 'index.md' ), 
			},
		],
	},
	{
		text  : 'Contribute',
		items : [
			{
				text : 'Report issues', link : bugs.url, 
			},
			{
				text : 'Todo', link : joinPath( extra.docsPath.todo,'/v1' ), 
			},
		],
	},
	{
		text  : 'About',
		items : [
			{
				text : 'License', 
				link : joinUrl( repository.url, 'blob/main/LICENSE' ),
			},
			{
				text : 'More projects', 
				link : extra.collective.web, 
			},
		],
	},
]
export const sidebar = { 
	'/guide/' : sidebarConstructor,
	'/todo/'  : sidebarConstructor,
}
export const nav =  [
	{ 
		text : 'Home',
		link : '/', 
	},
	{ 
		text        : 'Guide', 
		activeMatch : '/^\\/guide\\//',
		link        : joinPath( extra.docsPath.guide ),
	},
	{ 
		text : 'Donate', 
		link : funding.url, 
	},
]
