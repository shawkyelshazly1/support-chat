import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set, get) => ({
	isConnected: true,
	connectedSupport: {},
	conversations: [
		{
			id: "asdasasfds",
			socketId: "asdfsadsd",
			username: "Ahmed",
			messages: [],
		},

		{
			id: "asewqebvb",
			socketId: "asdsawedsd",
			username: "Karim",
			messages: [],
		},
	],
	selectedConversation: {},
	availableCapactiy: 4,
	socketClient: null,
	setSelectedConversation: (conversation) => {
		set({ selectedConversation: { ...conversation } });
	},
	assignChat: ({ user, conversation }) => {
		set({
			availableCapactiy: get().availableCapactiy - 1,
			conversations: [
				...get().conversations,
				{
					id: conversation,
					socketId: user.socketId,
					username: user.username,
					messages: [],
				},
			],
		});
	},

	connectSupport: (user) => set({ connectedSupport: user, isConnected: true }),
	addMessage: (conversationId, message) => {
		let selectedConversation = get().conversations.filter(
			(conversation) => conversation.id === conversationId
		)[0];

		selectedConversation.messages = [message, ...selectedConversation.messages];
		set({
			conversations: get().conversations.map((conversation) =>
				conversation.id === conversationId ? selectedConversation : conversation
			),
		});
	},

	addMessagesHistory: (conversationId, messages) => {
		let selectedConversation = get().conversations.filter(
			(conversation) => conversation.id === conversationId
		)[0];

		selectedConversation.messages = [
			...messages,
			...selectedConversation.messages,
		];
		set({
			conversations: get().conversations.map((conversation) =>
				conversation.id === conversationId ? selectedConversation : conversation
			),
		});
	},

	setSocketClient: (socket) => set({ socketClient: socket }),
	removeSocketClient: () => set({ socketClient: null }),
	disconnectSupport: () =>
		set({
			isConnected: false,
			connectedSupport: {},
			conversations: [],
			socketClient: null,
			availableCapactiy: 4,
		}),
});

export const useSupportStore = create(devtools(store));
