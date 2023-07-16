const { AdminService, AgentService } = require("../services");
const adminAuth = require("./middlewares/auth");

let base_URL = `/admin/v1`;

module.exports = (app) => {
	const adminService = new AdminService();
	const agentService = new AgentService();

	// Register Route
	app.post(`${base_URL}/register`, async (req, res, next) => {
		const {
			username = "",
			password = "",
			company = "",
			firstName = "",
			lastName = "",
		} = req.body || {};

		// validate all fields are present
		if (!username || !password || !company || !firstName || !lastName) {
			return res.status(409).json({ error: "Admin information is required." });
		}

		// create new admin in DB
		let admin = await adminService.registerAdmin({
			username,
			password,
			company,
			firstName,
			lastName,
		});

		// return if error
		if (admin.error) {
			return res.status(409).json({ error: admin.error });
		}

		// return success response
		return res.status(200).json({ message: "Admin Created." });
	});

	// Register Route
	app.post(`${base_URL}/manager/register/`, async (req, res, next) => {
		const {
			username = "",
			password = "",
			company = "",
			firstName = "",
			lastName = "",
			api_key = "",
			role = "",
		} = req.body || {};

		// validate all fields are present
		if (
			!username ||
			!password ||
			!company ||
			!firstName ||
			!lastName ||
			!api_key ||
			!role
		) {
			return res.status(409).json({ error: "Admin information is required." });
		}

		// create new admin in DB
		let admin = await adminService.registerAdmin({
			username,
			password,
			company,
			firstName,
			lastName,
			api_key,
			role,
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

	// load admin settings
	app.get(`${base_URL}/settings`, adminAuth, async (req, res, next) => {
		const { _id } = req.admin;

		// find by id in req
		let settings = await adminService.getAdminSettings(_id);

		// return if error
		if (settings.error) {
			return res.status(409).json({ error: settings.error });
		}

		return res.status(200).json(settings);
	});

	// update admin settings
	app.post(`${base_URL}/settings`, adminAuth, async (req, res, next) => {
		const { _id } = req.admin;
		let { settings } = req.body;

		// find by id in req
		let updatedSettings = await adminService.updateAdminSettings(_id, settings);

		// return if error
		if (updatedSettings.error) {
			return res.status(409).json({ error: updatedSettings.error });
		}

		return res.status(200).json(updatedSettings);
	});

	// create agent
	app.post(`${base_URL}/agent/register`, adminAuth, async (req, res, next) => {
		const {
			password = "",
			company = "",
			firstName = "",
			lastName = "",
			api_key = "",
		} = req.body || {};

		// validate all fields are present
		if (!password || !company || !firstName || !lastName || !api_key) {
			return res.status(409).json({ error: "Agent information is required." });
		}

		// careate new agent in DB
		let agent = await agentService.registerAgent({
			password,
			company,
			firstName,
			lastName,
			api_key,
		});

		// return if error
		if (agent.error) {
			return res.status(409).json({ error: agent.error });
		}

		// return success response
		return res
			.status(200)
			.json({ message: "Agent Created.", username: agent.username });
	});
};
