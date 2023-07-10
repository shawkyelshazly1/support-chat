const { getFirstInQueue } = require("../redis-user");

module.exports = (io, socket, redis) => {
	socket.on("support-connect", async (data) => {
		console.log(`Support Connected.`);
		socket.username = data.username;
	});

	socket.on("disconnect", async () => {
		console.log(`Support Disconnected.`);
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
		}
	});

	socket.on("leave-room", ({ conversationId }) => {
		socket.leave(conversationId);
	});
};
