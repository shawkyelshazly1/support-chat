// add support to support queue
const joinQueue = async (redisClient, { socketId, username }) => {
	redisClient.rpush("support-queue", JSON.stringify({ socketId, username }));
};

const leaveQueue = async (redisClient, { socketId, username }) => {
	/*#TODO: remove support from queue and route all 
	active conversations users to 'users-queue'
	*/
};

module.exports = { joinQueue, leaveQueue };
