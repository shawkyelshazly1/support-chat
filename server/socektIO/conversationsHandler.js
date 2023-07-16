const { retrieveSupport, updateSupport } = require("../redis-support");

module.exports = (io, socket, redis) => {
	socket.on("support:get-history", ({ conversation }) => {
		socket.broadcast.to(conversation).emit("user:get-history");
	});

	socket.on("user:send-history", ({ conversation, messages }) => {
		socket.broadcast
			.to(conversation)
			.emit("support:receive-history", { conversation, messages });
	});

	
	socket.on("conversation:message", ({ conversation, message }) => {
		socket.broadcast
			.to(conversation)
			.emit("conversation:message", { conversation, message });
	});

	socket.on("support:end-conversation", async ({ conversationId }) => {
		socket.leave(conversationId);
		socket.broadcast.to(conversationId).emit("user:end-conversation");

		// remove from active conversations on user disconnection
		let { support, idx } = await retrieveSupport(
			redis,
			socket.id,
			socket.api_key
		);
		support = {
			...support,
			active: support.active - 1,
			closed: support.closed + 1,
		};
		await updateSupport(redis, support, idx, socket.api_key);
	});
};
