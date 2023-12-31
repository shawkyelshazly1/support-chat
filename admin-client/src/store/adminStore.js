import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { validateAuth } from "../utils/admin";

import { socket } from "../socket/socket";

const store = (set, get) => ({
	isAuthenticated: false,
	admin: {},
	accessToken: "",
	socketClient: null,
	queueSummary: {},
	agentsData: [],
	isLoading: true,
	setLoading: (loadingState) => set({ isLoading: loadingState }),
	logout: () => {
		localStorage.removeItem("accessToken");
		set({
			isAuthenticated: false,
			admin: {},
			socketClient: null,
			accessToken: "",
			isLoading: false,
		});
	},
	connectAdmin: (socket) => {
		set({ socketClient: socket });
	},
	login: (adminData) => {
		localStorage.setItem("accessToken", adminData.accessToken);
		set({
			admin: adminData.admin,
			isAuthenticated: true,
			accessToken: adminData.accessToken,
			isLoading: false,
		});
	},
	setQueueSummaryData: (data) => {
		set({ queueSummary: data });
	},
	setAgentsData: (data) => {
		set({ agentsData: data });
	},
	checkAuth: async () => {
		let response = await validateAuth();

		if (response.admin) {
			socket.connect();
			socket.emit("admin:connect", { ...response.admin });
			set({
				accessToken: localStorage.getItem("accessToken"),
				admin: response.admin,
				isAuthenticated: true,
				isLoading: false,
				socketClient: socket,
			});
		} else {
			localStorage.removeItem("accessToken");
			set({
				isAuthenticated: false,
				admin: {},
				socketClient: null,
				accessToken: "",
				isLoading: false,
			});
		}
	},
	updateSettings: (updatedSettings) => {
		set({ admin: { ...get().admin, settings: updatedSettings } });
	},
});

export const useAdminStore = create(devtools(store));
