// – – – – – – – – – –
/**
 * Represents a base error class for the Ephrem AI project.
 * Extends the built-in Error class to include additional context information.
 */
export class BaseEphremAiError extends Error {
	/**
	 * A record containing additional context information about the error.
	 * @type {Record<string, unknown>}
	 */
	public context: Record<string, unknown>;

	/**
	 * Creates an instance of BaseEphremError.
	 * @param message The error message to show to the user.
	 */
	constructor(message: string) {
		super(message);
		this.name = "BaseEphremAiError";
		this.context = {};
	}
}
