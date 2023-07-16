const mongoose = require("mongoose");
const AdminSettings = require("./adminSettings");

const adminSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		username: { type: String, required: true, trim: true, unique: true },
		password: { type: String, required: true, trim: true, select: false },
		api_key: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			select: false,
		},
		company: { type: String, required: true, trim: true },
		role: {
			type: String,
			required: true,
			trim: true,
			enum: ["admin", "manager"],
			default: "admin",
		},
		settings: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AdminSettings",
			autopopulate: true,
		},
	},
	{ timestamps: true }
);

// delete admin settings on admin deletion
adminSchema.post("remove", async (doc, next) => {
	await AdminSettings.deleteMany({ admin: doc._id });
	next();
});

adminSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Admin", adminSchema);
