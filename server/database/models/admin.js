const mongoose = require("mongoose");
const { hashAPIKey } = require("../../utils/auth");

const adminSchema = mongoose.Schema(
	{
		username: { type: String, required: true, trim: true, unique: true },
		password: { type: String, required: true, trim: true, select: false },
		api_key: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			select: false,
		},
		company: { type: String, required: true, trim: true, unique: true },
		role: {
			type: String,
			required: true,
			trim: true,
			enum: ["admin", "manager"],
			default: "admin",
		},
	},
	{ timestamps: true }
);

// virtual field for hashed api_key
adminSchema.virtual("hashedAPIKey").get(async function () {
	return await hashAPIKey(this.api_key);
});

module.exports = mongoose.model("Admin", adminSchema);
