const { AgentModel } = require("../models");

class AgentRepository {
	// Create Agent
	async CreateAgent(agentData) {
		try {
			let newAgent = await new AgentModel(agentData);
			return await newAgent.save();
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// Find Agent By Username
	async FindAgentByUsername(username) {
		try {
			let existingAgent = await AgentModel.findOne({ username });
			return existingAgent;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// Find Agent By Id
	async FindAgentById(agentId) {
		try {
			let existingAgent = await AgentModel.findById(agentId).select(
				"+password"
			);

			return existingAgent;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = AgentRepository;
