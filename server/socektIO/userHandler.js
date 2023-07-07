const {
	addUserToQueue,
	removeUserfromQueue,
	getUserQueuePositions,
} = require("../redis");

module.exports = (io, socket, redis) => {
	// when user connects
	socket.on("user-connect", async (data) => {
		console.log("user started session");
		socket.username = data.username;
		addUserToQueue(redis, {
			socketId: socket.id,
			username: data.username,
		});
	});
	socket.on("disconnect", async () => {
		console.log(`User disconnected`);

		//TODO: change based on user status if in chat or in queue
		removeUserfromQueue(redis, {
			socketId: socket.id,
			username: socket.username,
		});
	});

	socket.on("ping-queue", async () => {
		let userIdx = await getUserQueuePositions(redis, socket.id);
		socket.emit("pong-queue", {
			content: `Please wait, You are No.${userIdx + 1} on the queue.`,
			type: "info",
		});
	});
};
