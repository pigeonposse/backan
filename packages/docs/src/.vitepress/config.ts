/**
 * Vitepress config.
 *
 * @description Vitepress config.
 * @see https://vitepress.dev/reference/site-config
 * @see https://vitepress.dev/reference/default-theme-config
 */

import { defineConfig } from 'vitepress'
import {  description, funding, extra, repository, bugs, license} from "../../../../package.json"
import { joinPath, joinUrl } from '@backan/config/core'
import MarkdownItTaskList from 'markdown-it-task-lists'
import {srcDir,npmSVG } from './const'

const name = extra.productName
const repoUrl = repository.url.endsWith('/') ? repository.url : repository.url +'/' ;

const sidebar = [
	{
	  text: 'Introduction',
	  items: [
		{ text: 'What is BACKAN?', link: joinPath(extra.docsPath.guide,'/') },
	  ]
	},
	{
	  text: 'Reference',
	  items: [
		{ 
			text: '📚 Library', 
			collapsed: false,
			items: [
				{
					text: 'Get started',
					link: joinPath(extra.docsPath.core) 
				},
				{
					text: 'App',
					link: joinPath(extra.docsPath.core, 'app') 
				},
				{
					text: 'Route',
					link: joinPath(extra.docsPath.core, 'route') 
				},
				{
					text: 'Endpoint - GET',
					link: joinPath(extra.docsPath.core, 'get') 
				},
				{
					text: 'Endpoint - POST',
					link: joinPath(extra.docsPath.core, 'post') 
				},
				{
					text: 'Endpoint - STREAM',
					link: joinPath(extra.docsPath.core, 'stream') 
				},
				// {
				// 	text: 'Endpoint - OTRHERS',
				// 	link: joinPath(extra.docsPath.core, 'more') 
				// },
			]
		},
		{ 
			text: '🗄️ Server', 
			link: joinPath(extra.docsPath.server) 
		},
		{ 
			text: '📦 Builder', 
			link: joinPath(extra.docsPath.builder) 
		},
	  ]
	},
	{
	  text: 'Contribute',
	  items: [
		{ text: 'Report issues', link: bugs.url },
		{ text: 'Todo', link: joinPath(extra.docsPath.todo,'/v1') },
	  ]
	},
	{
	  text: 'About',
	  items: [
		{ text: 'License', link: repoUrl+ 'blob/main/LICENSE'},
		{ text: 'More projects', link: extra.collective.web },
	  ]
	}
  ]
const nav =  [
	{ 
	  text: 'Home',
	  link: '/' 
	},
	{ 
	  text: 'Guide', 
	  activeMatch: '/^\/guide\//',
	  link:  joinPath(extra.docsPath.guide),
	},
	{ 
	  text: 'Donate', 
	  link: funding.url 
	},
  ]

export default defineConfig({

  title: `${name} - A Cross-Browser Extension Builder`,
  titleTemplate: `:title - ${name} Documentation`,
  description,
  lang: 'en',
  markdown: {
    config: (md) => {
        md.use(MarkdownItTaskList)
    }
  },
  cacheDir: '../__cache__',
  outDir: '../dist',
  srcDir,
  cleanUrls: true,
//   ignoreDeadLinks: true,
  head: [[
    'link', 
    { 
      rel: 'icon', 
      href: '/favicon.png' // use first "/" for child routes
    }
  ]],
  themeConfig: {
	// ...posts,
    logo: '/logo.png', // use first "/" for child routes
    siteTitle: name.toUpperCase(),
    search: {
      provider: 'local'
    },
	editLink: {
		pattern: joinUrl(repoUrl, 'edit/main/docs/:path'),
	},
	outline: 'deep',
    nav,
    sidebar: { 
		'/guide/': sidebar,
		'/todo/': sidebar,
	},
    // socialLinks: extra.socialLinks as DefaultTheme.SocialLink[],
    socialLinks: [
		{ 
			icon: {svg: npmSVG}, 
			link: extra.libraryUrl 
		},
      	{ 
			icon: 'github', 
			link: repository.url 
		},
    ],
	// @ts-ignore
	collectiveLinks : {
		...extra.collective.social,
		web: extra.collective.web,
		email: extra.collective.email
	},
	customFooter: {
		license,
		copy: {
			name: extra.collective.name,
			url: extra.collective.url
		}
	},
  },
})
