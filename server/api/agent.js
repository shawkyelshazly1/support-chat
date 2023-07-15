const { AgentService } = require("../services");
const agentAuth = require("./middlewares/agentAuth");

let base_URL = `/agent/v1`;

module.exports = (app) => {
	const agentService = new AgentService();

	// Login Route
	app.post(`${base_URL}/login`, async (req, res, next) => {
		const { username, password } = req.body;

		// validate all fields are present
		if (!username || !password) {
			return res.status(409).json({ error: "Agent information is required." });
		}

		let agent = await agentService.loginAgent({ username, password });

		// return if error
		if (agent.error) {
			return res.status(409).json({ error: agent.error });
		}

		// return success response
		return res.status(200).json({ ...agent });
	});

	// load agent route
	app.get(`${base_URL}/`, agentAuth, async (req, res, next) => {
		const { _id } = req.agent;

		let agent = await agentService.loadAgent(_id);

		// return if error
		if (agent.error) {
			return res.status(409).json({ error: agent.error });
		}

		return res.status(200).json({ agent });
	});
};
