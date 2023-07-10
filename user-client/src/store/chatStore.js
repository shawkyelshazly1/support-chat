import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set, get) => ({
	chatMessages: [],
	username: "",
	isConnected: false,
	inQueue: true,
	socketClient: null,
	supportData: {},
	conversationStatus: "inactive",
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
	endConversation: () => {
		set({
			supportData: {},
			conversationStatus: "inactive",
		});
	},
	reconnect: () => {set({supportData:{},inQueue:true})},
	disconnectUser: () =>
		set(() => ({
			chatMessages: [],
			username: "",
			isConnected: false,
			inQueue: true,
			socketClient: null,
			conversationStatus: "inactive",
		})),
	setUsername: (username) => set(() => ({ username })),
	startSupportConnection: (supportData) =>
		set({ inQueue: false, supportData, conversationStatus: "active" }),
});

export const useChatStore = create(devtools(store));
