const { validateAccessTokenAgent } = require("../../utils/auth");

module.exports = async (req, res, next) => {
	try {
		// validate access token from request
		let isAuthenticated = await validateAccessTokenAgent(req);

		// process on authentication success
		if (isAuthenticated) {
			return next();
		}

		// return unauthorized access on fail
		return res.status(403).json({ error: "Not Authorized" });
	} catch (error) {
		return res.status(403).json({ error: "Not Authorized!" });
	}
};
