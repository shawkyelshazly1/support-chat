import { io } from "socket.io-client";

let url = "https://support-desk-api-9wy1.onrender.com";

export const socket = io(url, {
	autoConnect: false,
	transports: ["websocket", "polling", "flashsocket"],
});
