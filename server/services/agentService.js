const { AgentRepository } = require("../database");
const { AgentModel } = require("../database/models");

const { generateUniqueUsername } = require("../utils/agent");
const { hashPassword, generateAccessToken } = require("../utils/auth");
const bcryptjs = require("bcryptjs");
class AgentService {
	constructor() {
		this.repository = new AgentRepository();
	}

	// Register Agent
	async registerAgent(agentData) {
		try {
			if (
				Object.values(agentData).some((fieldValue) => fieldValue.trim() === "")
			) {
				return { error: "Agent registration information is required" };
			}

			let username = await generateUniqueUsername(AgentModel, [
				agentData.firstName,
				agentData.lastName,
			]);

			let newAgent = await this.repository.CreateAgent({
				...agentData,
				settings: agentData.settingsId,
				password: await hashPassword(agentData.password),
				username,
			});

			return newAgent;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// Login Agent
	async loginAgent({ username, password }) {
		try {
			let existingAgent = await this.repository.FindAgentByUsername(username);

			if (!existingAgent) {
				return { error: "Agent not found." };
			}

			let agent = await this.repository.FindAgentById(existingAgent._id);

			if (!(await bcryptjs.compare(password, agent.password))) {
				return { error: "Wrong Password." };
			}

			let accessToken = await generateAccessToken(existingAgent);

			return { support: existingAgent, accessToken };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// Load Agent
	async loadAgent(agentId) {
		try {
			let existingAgent = await this.repository.FindAgentById(agentId);

			if (!existingAgent) return { error: "Not Found!" };

			let { password, ...agent } = existingAgent._doc;

			return { ...agent };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = AgentService;
