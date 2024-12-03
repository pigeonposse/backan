
import {
	onMounted,
	h,
}    from 'vue'
import mediumZoom          from 'medium-zoom'
import DefaultTheme        from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import 'virtual:group-icons.css'
import '@shikijs/vitepress-twoslash/style.css'

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
import Footer      from './components/Footer.vue'
import HomeContent from './components/HomeContent.vue'
import PostAuthor  from './components/PostAuthor.vue'
import PostCard    from './components/PostCard.vue'
import PostHeader  from './components/PostHeader.vue'
// @ts-ignore
import Posts      from './components/Posts.vue'
import PostTopBar from './components/PostTopBar.vue'
import './custom.css'

export default {
	extends : DefaultTheme,
	setup() {

		onMounted( () => {

			mediumZoom( '[data-zoomable]', { background: 'var(--vp-c-bg)' } )

		} )

	},
	Layout() {

		return h( DefaultTheme.Layout, null, {
			'aside-outline-before' : () => h( PostAuthor ),
			'doc-before'           : () => h( PostHeader ),
			'layout-top'           : () => h( PostTopBar ),
			'layout-bottom'        : () => h( Footer ),
			'home-features-after'  : () => h( HomeContent ),
		} )

	},
	async enhanceApp( { app } ) {

		app.component( 'PostCard', PostCard )
		app.component( 'Posts', Posts )
		// app.component('post', PostLayout);
		app.use( TwoslashFloatingVue )

	},
}

