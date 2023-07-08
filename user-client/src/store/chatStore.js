import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set, get) => ({
	chatMessages: [],
	username: "",
	isConnected: false,
	inQueue: true,
	socketClient: null,
	supportData: {},
	sendMessage: (message) =>
		set((state) => ({ chatMessages: [message, ...state.chatMessages] })),
	addInfoMessage: (message) => {
		let infoMessages = get().chatMessages.filter(
			(message) => message.type === "info"
		);

		if (infoMessages.slice(0)[0]?.content !== message.content) {
			set((state) => ({ chatMessages: [message, ...state.chatMessages] }));
		}
	},
	connectUser: (socketClient) =>
		set(() => ({ isConnected: true, socketClient })),
	disconnectUser: () =>
		set(() => ({
			chatMessages: [],
			username: "",
			isConnected: false,
			inQueue: true,
			socketClient: null,
		})),
	setUsername: (username) => set(() => ({ username })),
	startSupportConnection: (supportData) => set({ inQueue: false, supportData }),
});

export const useChatStore = create(devtools(store));
