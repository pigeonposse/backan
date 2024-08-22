/**
 * CONSTANTS.
 */ 
import { bugs } from '../package.json'

export const name = 'BACKAN' as const
export const bugsUrl = bugs.url
export const ERROR_ID = {
	NAME_UNDEFINED          : 'NAME_UNDEFINED',
	UNEXPECTED              : 'UNEXPECTED',
	EXIST_INPUT_DIR         : 'EXIST_INPUT_DIR',
	TEMPLATE_NO_EXIST       : 'TEMPLATE_NO_EXIST',
	COPY_TEMPLATE_FAIL      : 'COPY_TEMPLATE_FAIL',
	PKG_CREATED_NOT_FOUND   : 'PKG_CREATED_NOT_FOUND',
	PKG_CHANGED_VALUES_FAIL : 'PKG_CHANGED_VALUES_FAIL',
} as const
export const TEMPLATES = {
	DEMO        : 'demo',
	SKELETON    : 'skeleton',
	DEMO_TS     : 'demo-ts',
	SKELETON_TS : 'skeleton-ts',
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
	INPUT    : 'input',
	NAME     : 'name',
	TEMPLATE : 'template',
	INSTALL  : 'install',
	OPEN     : 'open',
} as const
export const OPTS_DEFAULT = {
	INPUT    : undefined,
	NAME     : undefined,
	TEMPLATE : TEMPLATES.DEMO,
	INSTALL  : false,
	OPEN     : OPEN_OPTS.NONE,
} as const
