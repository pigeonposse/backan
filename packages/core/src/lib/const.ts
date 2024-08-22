/**
 * Response messages used throughout the application for various HTTP responses.
 *
 */
export const RESPONSE_MESSAGES = {
	/**
	 * Message for a 500 Internal Server Error.
	 */
	ERROR_500            : 'Internal Server error',
	/**
	 * Message for a 404 Page Not Found error.
	 */
	ERROR_404            : 'Page not found',
	/**
	 * Message for a 400 Bad Request error.
	 */
	ERROR_400            : 'Bad request',
	/**
	 * Message indicating no data error.
	 */
	NO_DATA_ERROR        : 'No data error',
	/**
	 * Help message for a 500 Internal Server Error.
	 */
	HELP_500             : 'Contact the developers to report the issue or wait until the issue is resolved',
	/**
	 * Help message for a 400 Bad Request error.
	 */
	HELP_400             : 'Please read the documentation for a successful response',
	/**
	 * Message indicating successful data fetch.
	 */
	SUCCESS_FETCH        : 'Successfully fetched data',
	/**
	 * Message indicating a 404 Page Not Found error.
	 */
	ERROR_PAGE_NOT_FOUND : 'Page not found',
	/**
	 * Message indicating a validation error.
	 */
	ERROR_VALIDATION     : 'Error in validation request',
}
/**
 * Error IDs used to identify specific types of errors in the application.
 *
 */
export const ERROR_ID = {
	/**
	 * ID for a 404 Page Not Found error.
	 */
	PAGE_NOT_FOUND   : 'PAGE-NOT-FOUND',
	/**
	 * ID for a 400 Bad Request error.
	 */
	BAD_REQUEST      : 'BAD-REQUEST',
	/**
	 * ID for a 500 Internal Server Error during server fetch.
	 */
	SERVER_FETCH     : 'SERVER-FETCH',
	/**
	 * ID for validation errors.
	 */
	VALIDATION       : 'VALIDATION',
	/**
	 * ID indicating no documentation was provided.
	 */
	NO_DOCS_PROVIDED : 'NO-DOCS-PROVIDED',
} as const
