const mongoose = require("mongoose");

const agentSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		username: { type: String, required: true, trim: true, unique: true },
		password: { type: String, required: true, trim: true, select: false },
		api_key: {
			type: String,
			required: true,
			trim: true,
		},
		company: { type: String, required: true, trim: true },
		settings: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AdminSettings",
			autopopulate: true,
		},
	},
	{ timestamps: true }
);

agentSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Agent", agentSchema);
