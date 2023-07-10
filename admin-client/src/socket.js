import { io } from "socket.io-client";

let url = "http://localhost:5000";

export const socket = io(url, {
	autoConnect: false,
	transports: ["websocket", "polling", "flashsocket"],
});
