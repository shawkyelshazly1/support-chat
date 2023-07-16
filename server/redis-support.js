// add support to support queue
const joinSupportList = async (
	redisClient,
	{
		socketId,
		username,
		status = "offline",
		closed = 0,
		active = 0,
		stateStart = Date.now(),
	},
	api_key
) => {
	redisClient.rpush(
		`support-list-${api_key}`,
		JSON.stringify({
			socketId,
			username,
			status,
			closed,
			active,
			stateStart,
		})
	);
};

// remove support from list
const leaveSupportList = async (redisClient, socketId, api_key) => {
	let supportList = await redisClient.lrange(
		`support-list-${api_key}`,
		0,
		-1,
		async (err, data) => {
			return await JSON.stringify(data);
		}
	);

	supportList = supportList.map((support) => JSON.parse(support));

	let foundSupport = supportList.filter(
		(support) => support.socketId === socketId
	)[0];

	redisClient.lrem(`support-list-${api_key}`, 1, JSON.stringify(foundSupport));
};

// update support
const updateSupport = async (redisClient, updatedSupport, idx, api_key) => {
	redisClient.lset(
		`support-list-${api_key}`,
		parseInt(idx),
		JSON.stringify(updatedSupport)
	);
};

// get support from list by socketId nad returns it's index on the list
const retrieveSupport = async (redisClient, socketId, api_key) => {
	let supportList = await redisClient.lrange(
		`support-list-${api_key}`,
		0,
		-1,
		async (err, data) => {
			return await JSON.stringify(data);
		}
	);

	supportList = supportList.map((support) => JSON.parse(support));

	supportList = supportList.map((support, idx) => {
		return { support, idx };
	});

	let foundSupport = supportList.filter(
		(item) => item.support.socketId === socketId
	)[0];

	return foundSupport;
};

// get support list
const getSupportList = async (redisClient, api_key) => {
	let supportList = await redisClient.lrange(
		`support-list-${api_key}`,
		0,
		-1,
		async (err, data) => {
			return await JSON.stringify(data);
		}
	);
	supportList = supportList.map((support) => JSON.parse(support));

	return supportList;
};

module.exports = {
	joinSupportList,
	leaveSupportList,
	retrieveSupport,
	updateSupport,
	getSupportList,
};
