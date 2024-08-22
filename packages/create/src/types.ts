import type {
	ERROR_ID,
	INSTALL_OPTS,
	OPEN_OPTS, 
	TEMPLATES, 
} from './const'

export type CreateParams = {
    /**
     * Directory to build.
     *
     * @default .
     */
	input?: string
    /**
     * The name of the project.
     */
	name?: string
    /**
     * The template to use for the project.
     * Can be either 'demo' for a demonstration project or 'skeleton' for a basic setup.
     *
     * @default demo
     */
	template?: typeof TEMPLATES[keyof typeof TEMPLATES]
    /**
     * Whether to automatically install dependencies after creating the project.
     *
     * @default false
     */
	install?: typeof INSTALL_OPTS[keyof typeof INSTALL_OPTS]
    /**
     * Specifies whether to open the project in an IDE or text editor after creation.
     * Can be `false` for no IDE, or specify an IDE/editor to open.
     * Supported options include:
     * - `'code'`: Visual Studio Code
     * - `'subl'`: Sublime Text
     * - `'webstorm'`: WebStorm.
     *
     * @default false
     */
	open?: typeof OPEN_OPTS[keyof typeof OPEN_OPTS]
}

export type CreateErrorID = typeof ERROR_ID[keyof typeof ERROR_ID]
export type CreateErrorData = {
	opts: CreateParams
} & Record<string, unknown>
