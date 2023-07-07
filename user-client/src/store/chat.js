import { create } from "zustand";

const store = (set) => ({
	chatMessages: [],
	isConnected: false,
	socketClient: null,
	sendMessage: (message) =>
		set((state) => ({ chatMessages: [message, ...state.chatMessages] })),
	connectUser: () => set((state) => ({ isConnected: true })),
});

export const useChatStore = create(store);
