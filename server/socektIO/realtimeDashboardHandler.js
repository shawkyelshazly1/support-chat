const { getCustomersInQueue } = require("../redis-user");
const { getSupportList } = require("../redis-support");
const _ = require("lodash");

module.exports = (io, socket, redis) => {
	socket.on("admin-connect", () => {
		console.log("Admin connected.");
	});

	socket.on("ping-queue-updates", async () => {
		let customersInQueue = await getCustomersInQueue(redis);
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
				(customer) => Math.floor((currentTime - customer.startTime) / 1000) > 50
			).length,
			skills: grouped,
		};

		socket.emit("pong-queue-updates", data);
	});

	socket.on("ping-agents-updates", async () => {
		let data = await getSupportList(redis);
		socket.emit("pong-agents-updates", data);
	});
};
