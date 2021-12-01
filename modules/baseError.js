const { response } = require("express");
const httpResponseCodes = require("./httpResponsCodes");

class BaseError extends Error {
	constructor(responsCode = httpResponseCodes.OK, message) {
		super(message);
		this.responsCode = responseCode;
	}
}

module.exports = BaseError;