// add user to queue
const addUserToQueue = async (redisClient, { socketId, username }) => {
	redisClient.rpush("users-queue", JSON.stringify({ socketId, username }));
};

const removeUserfromQueue = async (redisClient, { socketId, username }) => {
	redisClient.lrem("users-queue", 1, JSON.stringify({ socketId, username }));
};

const getUserQueuePositions = async (redisClient, socketId) => {
	let usersQueue = await redisClient.lrange(
		"users-queue",
		0,
		-1,
		async (err, data) => {
			return await JSON.stringify(data);
		}
	);

	let users = usersQueue.map((user) => JSON.parse(user));

	let userIdx = users.findIndex(
		(user) => String(user.socketId) === String(socketId)
	);

	return userIdx;
};

module.exports = {
	addUserToQueue,
	removeUserfromQueue,
	getUserQueuePositions,
};
