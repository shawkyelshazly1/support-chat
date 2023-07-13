const { AdminService } = require("../services");
const adminAuth = require("./middlewares/auth");

let base_URL = `/admin/v1`;

module.exports = (app) => {
	const adminService = new AdminService();

	// Register Route
	app.post(`${base_URL}/register`, async (req, res, next) => {
		const { username = "", password = "", company = "" } = req.body || {};

		// validate all fields are present
		if (!username || !password || !company) {
			return res.status(409).json({ error: "Admin information is required." });
		}

		// create new admin in DB
		let admin = await adminService.registerAdmin({
			username,
			password,
			company,
		});

		// return if error
		if (admin.error) {
			return res.status(409).json({ error: admin.error });
		}

		// return success response
		return res.status(200).json({ message: "Admin Created." });
	});

	// login Route
	app.post(`${base_URL}/login`, async (req, res, next) => {
		const { username, password } = req.body;

		// validate all fields are present
		if (!username || !password) {
			return res.status(409).json({ error: "Admin information is required." });
		}

		let admin = await adminService.loginAdmin({ username, password });

		// return if error
		if (admin.error) {
			return res.status(409).json({ error: admin.error });
		}

		// return success response
		return res.status(200).json({ ...admin });
	});

	// load admin Route
	app.get(`${base_URL}/`, adminAuth, async (req, res, next) => {
		const { _id } = req.admin;

		// find by id in req
		let admin = await adminService.loadAdmin(_id);

		// return if error
		if (admin.error) {
			return res.status(409).json({ error: admin.error });
		}

		return res.status(200).json({ admin });
	});

	// load api key
	app.get(`${base_URL}/api_key`, adminAuth, async (req, res, next) => {
		const { _id } = req.admin;

		let api_key = await adminService.getAPIKey(_id);

		if (api_key.error) {
			return res.status(409).json({ error: api_key.error });
		}

		return res.status(200).json({ ...api_key });
	});
};
