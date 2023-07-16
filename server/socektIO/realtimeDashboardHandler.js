const { getCustomersInQueue } = require("../redis-user");
const { getSupportList } = require("../redis-support");
const _ = require("lodash");

module.exports = (io, socket, redis) => {
	socket.on("admin:connect", (data) => {
		let { settings, ...adminData } = data;

		socket.admin = adminData;
		socket.api_key = settings.api_key;
		socket.admin_settings = settings;

		socket.type = "admin";
		console.log("Admin connected.");
	});

	socket.on("disconnect", () => {
		if (socket.type === "admin") {
			console.log(`Admin Disconnected.`);
		}
	});

	socket.on("admin:queue-updates", async () => {
		let customersInQueue = await getCustomersInQueue(redis, socket.api_key);
		let currentTime = Date.now();
		let skillsGrouped = _.groupBy(
			customersInQueue,
			(customer) => customer.skill
		);

		let skillsNames = Object.keys(skillsGrouped);

		let grouped = skillsNames.map((skillName) => {
			return {
				skill: skillName,
				inQueue: skillsGrouped[skillName].length,
				customers: skillsGrouped[skillName],
			};
		});

		grouped = grouped.map((group) => {
			return {
				...group,
				maxWaitTime: Math.floor(
					(currentTime -
						_.maxBy(group.customers, (customer) =>
							Math.floor((currentTime - customer.startTime) / 1000)
						).startTime) /
						1000
				),
			};
		});

		let data = {
			totalInQueue: customersInQueue.length,
			totalOverdue: customersInQueue.filter(
				(customer) =>
					Math.floor((currentTime - customer.startTime) / 1000) >
					socket.admin_settings.sla
			).length,
			skills: grouped,
		};

		socket.emit("admin:queue-updates", data);
	});

	socket.on("admin:agents-updates", async () => {
		let data = await getSupportList(redis, socket.api_key);
		socket.emit("admin:agents-updates", data);
	});
};
