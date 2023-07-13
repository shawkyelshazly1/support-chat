import { io } from "socket.io-client";

let url =
	import.meta.env.VITE_NODE_ENV === "production"
		? "https://support-desk-api-9wy1.onrender.com"
		: "http://localhost:5000";

export const socket = io(url, {
	autoConnect: false,
	transports: ["websocket", "polling", "flashsocket"],
});
