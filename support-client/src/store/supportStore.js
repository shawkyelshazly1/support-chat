import { create } from "zustand";

const store = (set, get) => ({
	isConnected: false,
	connectedUser: {},
	conversations: [],
	connectUser: (user) => set({ connectedUser: user, isConnected: true }),
	addMessage: (message) => {
		let selectedConversation = get().conversations.filter(
			(conversation) => conversation.id === message.conversationId
		)[0];

		selectedConversation.messages = [message, ...selectedConversation.messages];
		set({
			conversations: get().conversations.map((conversation) =>
				conversation.id === message.conversationId
					? selectedConversation
					: conversation
			),
		});
	},
});

export const useSupportStore = create(store);
