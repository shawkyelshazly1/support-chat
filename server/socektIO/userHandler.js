const {
	addUserToQueue,
	removeUserfromQueue,
	getUserQueuePositions,
} = require("../redis-user");

module.exports = (io, socket, redis) => {
	// when user connects
	socket.on("user-connect", async (data) => {
		console.log("user started session");
		socket.username = data.username;
		socket.type = "user";
		addUserToQueue(redis, {
			socketId: socket.id,
			username: data.username,
		});
	});
	socket.on("disconnect", async () => {
		if (socket.type === "user") {
			console.log(`User Disconnected.`);
			let inQueue = (await getUserQueuePositions(redis, socket.id)) >= 0;

			if (!inQueue) {
				socket.broadcast
					.to(socket.room)
					.emit("user-disconnected", { conversationId: socket.room });
			} else {
				removeUserfromQueue(redis, {
					socketId: socket.id,
					username: socket.username,
				});
			}
		}
	});

	socket.on("ping-queue", async () => {
		let userIdx = await getUserQueuePositions(redis, socket.id);
		if (userIdx >= 0)
			socket.emit("pong-queue", {
				content: `Please wait, You are No.${userIdx + 1} on the queue.`,
				type: "info",
			});
	});

	socket.on("join-support-room", (data) => {
		socket.join(data.conversation);
		socket.room = data.conversation;
		socket.broadcast
			.to(data.conversation)
			.emit("user-joined", { conversation: data.conversation });
	});
};
