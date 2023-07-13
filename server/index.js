const express = require("express"),
	cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://localhost:3001",
			"http://localhost:3002",
			"https://supportdesk-customer.onrender.com",
			"https://supportdesk-admin.onrender.com",
			"https://supportdesk-agent.onrender.com",
		],
		methods: ["GET", "POST"],
		credentials: true,
	})
);

let server = require("http").createServer(app);

const io = require("socket.io")(server);

// register socketIO userHandler
const {
	supportHandler,
	userHandlers,
	conversationsHandler,
	realtimeDashboardHandler,
} = require("./socektIO");
const { Redis } = require("ioredis");
const { initDBConnection } = require("./database");
const { AdminAPI } = require("./api");

// on Connection handlers
const onConnection = (socket, redis) => {
	supportHandler(io, socket, redis);
	userHandlers(io, socket, redis);
	conversationsHandler(io, socket, redis);
	realtimeDashboardHandler(io, socket, redis);
};

// connect MongoDB
initDBConnection();

//connect redis
const redis = new Redis(
	"rediss://red-ced0ulen6mpgskihs2b0:AKeNvPvbnwnNA0W9gV9g2ANne8xADQUw@frankfurt-redis.render.com:6379"
);

// connect socketIO
io.on("connection", (socket) => {
	onConnection(socket, redis);
});

// register APIs
AdminAPI(app);

server.listen(process.env.PORT || 5000, () => {
	console.log(`🚀 Server started on port ${process.env.PORT || 5000}`);
});
