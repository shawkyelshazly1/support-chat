import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { validateAuth } from "../utils/admin";
import { TroubleshootTwoTone } from "@mui/icons-material";

const store = (set, get) => ({
	isAuthenticated: false,
	admin: {},
	accessToken: "",
	socketClient: null,
	queueSummary: {},
	agentsData: [],
	isLoading: TroubleshootTwoTone,
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
			set({
				accessToken: localStorage.getItem("accessToken"),
				admin: response.admin,
				isAuthenticated: true,
				isLoading: false,
			});
		} else {
			set({
				isAuthenticated: false,
				admin: {},
				socketClient: null,
				accessToken: "",
				isLoading: true,
			});
		}
	},
});

export const useAdminStore = create(devtools(store));
