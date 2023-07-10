const { retrieveSupport, updateSupport } = require("../redis-support");

module.exports = (io, socket, redis) => {
	socket.on("get-messages-history", ({ conversation }) => {
		socket.broadcast.to(conversation).emit("get-messages-history");
	});

	socket.on("recieve-messages-history", ({ conversation, messages }) => {
		socket.broadcast
			.to(conversation)
			.emit("recieve-messages-history", { conversation, messages });
	});

	socket.on("send-message", ({ conversation, message }) => {
		socket.broadcast
			.to(conversation)
			.emit("recieve-message", { conversation, message });
	});

	socket.on("terminate-customer", async ({ conversationId }) => {
		socket.leave(conversationId);
		socket.broadcast.to(conversationId).emit("terminated");

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
