function logger(apiPathsToInclude) {
	const endpoints = apiPathsToInclude;

	return function (req, res, next) {
		if (endpoints.indexOf(req.path) != -1) {
			console.log(req.originalUrl);
			if (req.method !== "GET") {
				console.log(req.body);
			}
		}
		next();
	};
}

module.exports = logger;