import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { socket } from "../socket";
import { validateAuth } from "../utils/auth";

const store = (set, get) => ({
	isAuthenticated: false,
	isLoading: true,
	accessToken: "",
	support: {},
	socketClient: null,
	currentStatus: "offline",
	changeStatus: (status) => {
		set({ currentStatus: status });
	},
	setSocketClient: (socket) => set({ socketClient: socket }),
	removeSocketClient: () => set({ socketClient: null }),
	login: (supportData) => {
		localStorage.setItem("accessToken", supportData.accessToken);
		set({
			support: supportData.support,
			isAuthenticated: true,
			acessToken: supportData.accessToken,
			isLoading: false,
		});
	},
	logout: () => {
		localStorage.removeItem("accessToken");
		set({
			isAuthenticated: false,
			isLoading: false,
			support: {},
			accessToken: "",
			conversations: [],
			selectedConversation: {},
			availableCapactiy: 4,
			socketClient: null,
			currentStatus: "offline",
		});
	},
	checkAuth: async () => {
		let response = await validateAuth();

		if (response.support) {
			socket.connect();
			socket.emit("support:connect", { ...response.support });
			set({
				accessToken: localStorage.getItem("accessToken"),
				support: response.support,
				isAuthenticated: true,
				isLoading: false,
				socketClient: socket,
			});
		} else {
			localStorage.removeItem("accessToken");
			set({
				isAuthenticated: false,
				support: {},
				socketClient: null,
				accessToken: "",
				isLoading: false,
			});
		}
	},
});

export const useSupportStore = create(devtools(store));
