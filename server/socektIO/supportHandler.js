const {
	joinSupportList,
	leaveSupportList,
	retrieveSupport,
	updateSupport,
} = require("../redis-support");
const { getFirstInQueue } = require("../redis-user");

module.exports = (io, socket, redis) => {

	

	socket.on("support-connect", async (data) => {
		console.log(`Support Connected.`);
		socket.username = data.username;
		await joinSupportList(redis, {
			socketId: socket.id,
			username: data.username,
		});
	});

	socket.on("disconnect", async () => {
		console.log(`Support Disconnected.`);
		await leaveSupportList(redis, socket.id);
	});

	socket.on("disconnecting", () => {
		let supportConnectedRooms = Array.from(socket.rooms).slice(1);
		supportConnectedRooms.map((room) =>
			io.sockets.in(room).emit("support-disconnect")
		);
	});

	socket.on("assign-chat-ping", async () => {
		console.log("i have avail get me chat");
		let userInQueue = await getFirstInQueue(redis);
		if (userInQueue) {
			userInQueue = JSON.parse(userInQueue);

			let conversation = `${userInQueue.socketId}&${socket.id}`;

			// send userSocket to support
			socket.emit("assign-chat-pong", { user: userInQueue, conversation });

			// join room based on name format: userSocketId&SupportSocketId
			socket.join(conversation);

			// send supportSocket to user
			socket.to(userInQueue.socketId).emit("support-connected", {
				socketId: socket.id,
				username: socket.username,
				conversation,
			});

			// add to active conversaitons on support
			let { support, idx } = await retrieveSupport(redis, socket.id);
			support = {
				...support,
				active: support.active + 1,
			};
			await updateSupport(redis, support, idx);
		}
	});

	socket.on("change-status", async ({ status }) => {
		let { support, idx } = await retrieveSupport(redis, socket.id);
		support = { ...support, status, stateStart: Date.now() };
		await updateSupport(redis, support, idx);
	});

	socket.on("leave-room", async ({ conversationId }) => {
		socket.leave(conversationId);
		// remove from active conversations on user disconnection
		let { support, idx } = await retrieveSupport(redis, socket.id);
		support = {
			...support,
			active: support.active - 1,
			closed: support.closed + 1,
		};
		await updateSupport(redis, support, idx);
	});
};
