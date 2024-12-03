/**
 * Options for configuring the health check route.
 */
export type HealthRouteOptions = {
	/** Custom message for a 400 Bad Request error during the health check. */
	error400?                 : string
	/** Summary of the health check endpoint. */
	summary?                  : string
	/** Detailed description of the health check endpoint. */
	description?              : string
	/**
	 * Additional response parameters that can be included in the health check response.
	 */
	additionalResponseValues? : Record<string, boolean>
}
