/**
 * CONSTANTS.
 */ 
export const name = 'BACKAN' as const
export const ERROR_ID = {
	NAME_UNDEFINED : 'NAME_UNDEFINED',
	UNEXPECTED     : 'UNEXPECTED',
} as const
export const TEMPLATES = {
	DEMO     : 'demo',
	SKELETON : 'skeleton',
} as const
export const INSTALL_OPTS = {
	NONE : false,
	NPM  : 'npm',
	PNPM : 'pnpm',
	YARN : 'yarn',
} as const
export const OPEN_OPTS = {
	NONE     : false,
	VSCODE   : 'code',
	SUBLIME  : 'subl',
	WEBSTORM : 'webstorm',
} as const
export const OPTS = {
	NAME     : 'name',
	TEMPLATE : 'template',
	INSTALL  : 'install',
	OPEN     : 'open',
} as const
export const OPTS_DEFAULT = {
	NAME     : undefined,
	TEMPLATE : TEMPLATES.DEMO,
	INSTALL  : false,
	OPEN     : OPEN_OPTS.NONE,
} as const
