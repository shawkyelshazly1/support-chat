import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set, get) => ({
	isConnected: false,
	adminData: {},
	socketClient: null,
	queueSummary: {},
	agentsData: [],
	disconnectAdmin: () => {
		set({
			isConnected: false,
			adminData: {},
			socketClient: null,
		});
	},
	connectAdmin: (socket) => {
		set({ socketClient: socket });
	},
	loginAdmin: (adminData) => {
		set({ adminData, isConnected: true });
	},
	setQueueSummaryData: (data) => {
		set({ queueSummary: data });
	},
	setAgentsData: (data) => {
		set({ agentsData: data });
	},
});

export const useAdminStore = create(devtools(store));
