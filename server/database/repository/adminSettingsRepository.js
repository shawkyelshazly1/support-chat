const mongoose = require("mongoose");
const { AdminSettingsModel } = require("../models");

class AdminSettingsRepository {
	// create settings for new admin
	async CreateAdminSettings(adminId, api_key) {
		try {
			const newAdminSettings = await new AdminSettingsModel({
				admin: adminId,
				api_key,
			});
			await newAdminSettings.save();
			return newAdminSettings;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// Update settings
	async UpdateAdminSettings(adminId, settings) {
		try {
			const updatedSettings = await AdminSettingsModel.findOneAndUpdate(
				{ admin: adminId },
				{ ...settings },
				{ new: true }
			);

			return updatedSettings;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// Get admin settings by his ID
	async GetAdminSettingsByAdminId(adminId) {
		try {
			const adminSettings = await AdminSettingsModel.findOne({
				admin: adminId,
			});

			return adminSettings;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	//TODO: handle delete settings on admin delete
}

module.exports = AdminSettingsRepository;
