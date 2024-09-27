/**
 * Vitepress config.
 *
 * @description Vitepress config.
 * @see https://vitepress.dev/reference/site-config
 * @see https://vitepress.dev/reference/default-theme-config
 */

import { defineConfig } from 'vitepress'
import { description, extra, repository, license, author} from "../../../../package.json"
import { joinUrl } from '@backan/config/core'
import MarkdownItTaskList from 'markdown-it-task-lists'
import {srcDir,npmSVG } from './const'
import { sidebar, nav } from '../../../../.dev/docs.mjs'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { VitePWA } from 'vite-plugin-pwa'
import type {VitePWAOptions} from 'vite-plugin-pwa'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

const name = extra.productName
const colors = {
	primary: '#e8243d',
	secondary: '#ee683a',
	terciary: '#f49133',
	fourth: '#461411',
	shadow: '#f3b31d0d',
	divider: '#1a1a1c',
	bg: '#0c0d0f',
	bgAlt: '#41414133',
	bgSoft: '#121216',
	bgOpacity: '#0c0d0f82',
}
const lang = 'en'
const RSS: RSSOptions = {
	title: name,
	baseUrl: extra.docsUrl,
	copyright: `Copyright (c) ${new Date().getFullYear()}-present, ${name}`,
	description: description,
	language: lang,
	ignoreHome: true,
	author
}
const PWA: Partial<VitePWAOptions> = {
	registerType: 'autoUpdate',
	devOptions: {
	  enabled: true
	},
	manifest: {
		name: name,
		short_name: name,
		description: description,
		icons: [
			{
			  src: 'favicon-192x192.png',
			  sizes: '192x192',
			  type: 'image/png'
			},
			{
			src: 'favicon-96x96.png',
			  sizes: '96x96',
			  type: 'image/png'
			},
			{
				src: 'favicon-32x32.png',
			  sizes: '32x32',
			  type: 'image/png'
			}
		],
		theme_color: 'red',
	}
}

const ogDescription = description
const ogImage = joinUrl(extra.docsUrl,'banner.png')
const ogTitle = name
const ogUrl = extra.docsUrl

export default defineConfig({
  title: `${name} - ${extra.shortDesc}`,
  titleTemplate: `:title - ${name.toUpperCase()} Documentation`,
  description,
  lang,
  markdown: {
    config: (md) => {
		md.use(groupIconMdPlugin)
        md.use(MarkdownItTaskList)
    },
	codeTransformers: [
		// @ts-ignore
		transformerTwoslash()
	],
  },
  vite: {
	plugins: [
		// @ts-ignore
		groupIconVitePlugin(),
		// @ts-ignore
		RssPlugin(RSS),
		// @ts-ignore
		VitePWA(PWA)
	],
  },
  cacheDir: '../__cache__',
  outDir: '../dist',
  srcDir,
  cleanUrls: true,
//   ignoreDeadLinks: true,
  head: [
	[
		'style',
		{ 
			type: 'text/css', 
			id: 'theme-css-colors'
		}, 
		`
:root {
    --pp-brand-1: ${colors.primary};
    --pp-brand-2:  ${colors.secondary};
	--pp-brand-3:  ${colors.terciary};
    --pp-brand-4:  ${colors.fourth};
	--pp-brand-shadow:  ${colors.shadow};
	--pp-radius: 15px;
    --vp-c-brand-1: var(--pp-brand-2);
    --vp-c-brand-2: var(--pp-brand-1);
    --vp-c-brand-3: var(--pp-brand-3);
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(150deg, var(--pp-brand-2), var(--pp-brand-4), var(--pp-brand-3), var(--pp-brand-1) );
    --vp-home-hero-image-background-image: linear-gradient(150deg, var(--pp-brand-2), var(--pp-brand-4), var(--pp-brand-3), var(--pp-brand-1));
    --vp-home-hero-image-filter: blur(56px);
}
.dark {
	--vp-c-bg: ${colors.bg};
	--vp-c-bg-alt: ${colors.bgAlt};
	--vp-c-bg-elv: ${colors.bgSoft};
	--vp-c-bg-soft: ${colors.bgSoft};
	--vp-c-bg-opacity: ${colors.bgOpacity};
	--vp-sidebar-bg-color: var(--vp-c-bg);
	--vp-c-divider: ${colors.divider};
}	
		` 
	],
	[
		'link', 
		{ 
		rel: 'icon', 
		href: '/favicon.png' // use first "/" for child routes
		}
  ],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: ogTitle }],
  ['meta', { property: 'og:image', content: ogImage }],
  ['meta', { property: 'og:url', content: ogUrl }],
  ['meta', { property: 'og:description', content: ogDescription }],
  ['meta', { property: 'og:site_name', content: extra.repoId }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:site', content: '@'+ extra.collective.socialUser.twitter }],
],
  themeConfig: {
	// ...posts,
    logo: '/logo.png', // use first "/" for child routes
    siteTitle: name.toUpperCase(),
    search: {
      provider: 'local'
    },
	editLink: {
		pattern: joinUrl(repository.url, 'edit/main/docs/:path'),
	},
	outline: 'deep',
    nav,
    sidebar,
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
