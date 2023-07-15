const mongoose = require("mongoose");

const adminSettingsSchema = mongoose.Schema(
	{
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin",
			required: true,
		},
		sla: { type: Number, default: 20, trim: true },
		api_key: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		agentStatus: [
			{
				name: { type: String, trim: true },
				color: { type: String, trim: true },
			},
		],
	},
	{ timestamps: true }
);

adminSettingsSchema.pre("save", function (next) {
	this.agentStatus = [
		{ name: "online", color: "#87B440" },
		{ name: "offline", color: "#E33A4B" },
	];
	return next();
});

module.exports = mongoose.model("AdminSettings", adminSettingsSchema);
