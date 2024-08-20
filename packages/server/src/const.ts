/**
 * Contains server error messages.
 */
export const SERVER_ERROR = {
	/** Error when a specific port is not available. */
	PORT_NOT_AVAILABLE  : 'PORT-NOT-AVAILABLE',
	/** Error when multiple ports are not available. */
	PORTS_NOT_AVAILABLE : 'PORTS-NOT-AVAILABLE',
	/** Unexpected server error. */
	UNEXPECTED          : 'UNEXPECTED',
	// /** Error when the server needs to shut down. */
	// EXIT: 'EXIT',
	/** Error when the hostname is not valid. */
	HOSTNAME_NOT_VALID  : 'HOSTNAME-NOT-VALID',
} as const
