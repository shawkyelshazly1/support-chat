const {
	addUserToQueue,
	removeUserfromQueue,
	getUserQueuePositions,
} = require("../redis-user");

module.exports = (io, socket, redis) => {
	// when user connects
	socket.on("user:connect", async (data) => {
		console.log("user started session");
		socket.username = data.username;
		socket.api_key = data.api_key;
		socket.type = "user";
		addUserToQueue(
			redis,
			{
				socketId: socket.id,
				username: data.username,
			},
			socket.api_key
		);
	});
	socket.on("disconnect", async () => {
		if (socket.type === "user") {
			console.log(`User Disconnected.`);
			let inQueue =
				(await getUserQueuePositions(redis, socket.id, socket.api_key)) >= 0;

			if (!inQueue) {
				socket.broadcast
					.to(socket.room)
					.emit("user:disconnected", { conversationId: socket.room });
			} else {
				removeUserfromQueue(
					redis,
					{
						socketId: socket.id,
						username: socket.username,
					},
					socket.api_key
				);
			}
		}
	});

	socket.on("user:queue", async () => {
		let userIdx = await getUserQueuePositions(redis, socket.id, socket.api_key);
		if (userIdx >= 0)
			socket.emit("user:queue", {
				content: `Please wait, You are No.${userIdx + 1} on the queue.`,
				type: "info",
			});
	});

	socket.on("user:join", (data) => {
		socket.join(data.conversation);
		socket.room = data.conversation;
		socket.broadcast
			.to(data.conversation)
			.emit("conversation:user-joined", { conversation: data.conversation });
	});
};
