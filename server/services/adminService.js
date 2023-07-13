const { AdminRepository } = require("../database");
const { hashPassword, generateAccessToken } = require("../utils/auth");
const bcryptjs = require("bcryptjs");

class AdminService {
	constructor() {
		this.repository = new AdminRepository();
	}

	// register new admin service
	async registerAdmin(adminData) {
		try {
			if (
				Object.values(adminData).some((fieldValue) => fieldValue.trim() === "")
			) {
				return { error: "Admin registration information is required" };
			}

			let existingAdmin = await this.repository.FindAdmin(
				adminData.username,
				adminData.company
			);

			if (existingAdmin) {
				return {
					error: "Sorry, Either username or company registered already.",
				};
			}

			let newAdmin = await this.repository.CreateAdmin({
				...adminData,
				password: await hashPassword(adminData.password),
			});

			return newAdmin;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// login admin service
	async loginAdmin({ username, password }) {
		try {
			let existingAdmin = await this.repository.FindAdminByUsername(username);
			if (!existingAdmin) return { error: "Admin not found!" };

			if (!(await bcryptjs.compare(password, existingAdmin.password))) {
				return {
					error: "Wrong Password",
				};
			}

			existingAdmin = await this.repository.FindAdminById(existingAdmin._id);

			let accessToken = await generateAccessToken(existingAdmin);

			return { admin: existingAdmin, accessToken };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// loadAdmin
	async loadAdmin(adminId) {
		try {
			let existingAdmin = await this.repository.FindAdminById(adminId);

			if (!existingAdmin) return { error: "Not Found!" };

			return { ...existingAdmin._doc };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// load admin api_key
	async getAPIKey(adminId) {
		try {
			let existingAdmin = await this.repository.FindAdminById(adminId, true);

			if (!existingAdmin) return { error: "Not Found!" };

			return { api_key: await existingAdmin.hashedAPIKey };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = AdminService;
