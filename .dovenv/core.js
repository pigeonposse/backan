
import { getWorkspaceConfig } from '@dovenv/theme-pigeonposse'

export default await getWorkspaceConfig( {
	metaURL  : import.meta.url,
	path     : '..',
	packages : {
		metaURL : import.meta.url,
		path    : '../packages',
	},
	core : {
		metaURL : import.meta.url,
		path    : '../packages/backan',
	},
} )

