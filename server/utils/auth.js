const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const base32 = require("base32");

// hash password
exports.hashPassword = async (password) => {
	let hashedPassword = await bcryptjs.hash(password, 10);
	return hashedPassword;
};

// generate access token
exports.generateAccessToken = async (payload) => {
	return jwt.sign(payload.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
};

// generate API Key
exports.generateAPIKey = async (payload) => {
	let apiKey = base32.encode(JSON.stringify(payload));
	return apiKey;
};

// check if valid token
exports.validateAccessToken = async (req) => {
	const token = req.get("authorization");

	if (token) {
		const payload = await jwt.verify(
			token.split(" ")[1],
			process.env.ACCESS_TOKEN_SECRET
		);

		req.admin = payload;
		return true;
	}
	return false;
};

// check if valid token agent
exports.validateAccessTokenAgent = async (req) => {
	const token = req.get("authorization");

	if (token) {
		const payload = await jwt.verify(
			token.split(" ")[1],
			process.env.ACCESS_TOKEN_SECRET
		);

		req.agent = payload;
		return true;
	}
	return false;
};
