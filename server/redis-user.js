// add user to queue
const addUserToQueue = async (redisClient, { socketId, username }, api_key) => {
	redisClient.rpush(
		`users-queue-${api_key}`,
		JSON.stringify({
			socketId,
			username,
			startTime: Date.now(),
			skill: "general",
		})
	);
};

const removeUserfromQueue = async (
	redisClient,
	{ socketId, username },
	api_key
) => {
	let usersList = await redisClient.lrange(
		`users-queue-${api_key}`,
		0,
		-1,
		async (err, data) => {
			return await JSON.stringify(data);
		}
	);

	usersList = usersList.map((user) => JSON.parse(user));

	let foundUser = usersList.filter((user) => user.socketId === socketId)[0];

	redisClient.lrem(`users-queue-${api_key}`, 1, JSON.stringify(foundUser));
};

const getUserQueuePositions = async (redisClient, socketId, api_key) => {
	let usersQueue = await redisClient.lrange(
		`users-queue-${api_key}`,
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

const getFirstInQueue = async (redisClient, api_key) => {
	return redisClient.lpop(`users-queue-${api_key}`, (e, res) => {
		return res;
	});
};

const getCustomersInQueue = async (redisClient, api_key) => {
	let usersQueue = await redisClient.lrange(
		`users-queue-${api_key}`,
		0,
		-1,
		async (err, data) => {
			return await JSON.stringify(data);
		}
	);

	let users = usersQueue.map((user) => JSON.parse(user));

	return users;
};

module.exports = {
	addUserToQueue,
	removeUserfromQueue,
	getUserQueuePositions,
	getFirstInQueue,
	getCustomersInQueue,
};
