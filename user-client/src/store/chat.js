import { create } from "zustand";

const store = (set, get) => ({
	chatMessages: [],
	username: "",
	isConnected: false,
	inQueue: true,
	socketClient: null,
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
	disconnectUser: () => set(() => ({ isConnected: false, socketClient: null })),
	setUsername: (username) => set(() => ({ username })),
});

export const useChatStore = create(store);
