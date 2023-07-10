module.exports = (io, socket) => {
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

	socket.on("terminate-customer", ({ conversationId }) => {
		socket.leave(conversationId);
		socket.broadcast.to(conversationId).emit("terminated");
	});
};
