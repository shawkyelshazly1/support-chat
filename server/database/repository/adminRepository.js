const mongoose = require("mongoose");
const { AdminModel } = require("../models");
const { generateAPIKey } = require("../../utils/auth");
const AdminSettingsRepository = require("./adminSettingsRepository");

class AdminRepository {
	constructor() {
		this.repository = new AdminSettingsRepository();
	}
	// create admin
	async CreateAdmin(adminData) {
		try {
			let api_key = await generateAPIKey({
				username: adminData.username,
				company: adminData.company,
			});

			let newAdmin = await new AdminModel({
				...adminData,
				api_key,
			});

			let adminSettings = await this.repository.CreateAdminSettings(
				newAdmin._id,
				api_key
			);

			await newAdmin.save();

			newAdmin = await AdminModel.findByIdAndUpdate(
				newAdmin._id,
				{
					settings: adminSettings._id,
				},
				{ new: true }
			);

			return newAdmin;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// find Admin By Id
	async FindAdminById(adminId, api_key) {
		try {
			let existingAdmin;
			if (api_key) {
				existingAdmin = await AdminModel.findById(adminId).select("api_key");
			} else {
				existingAdmin = await AdminModel.findById(adminId);
			}

			return existingAdmin;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// find admin by username
	async FindAdminByUsername(adminUsername) {
		try {
			const existingAdmin = await AdminModel.findOne({
				username: adminUsername,
			}).select("password");

			return existingAdmin;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// find admin by username or company
	async FindAdmin(adminUsername, adminCompany) {
		try {
			const existingAdmin = await AdminModel.findOne({
				$or: [{ username: adminUsername }, { company: adminCompany }],
			});

			return existingAdmin;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = AdminRepository;
