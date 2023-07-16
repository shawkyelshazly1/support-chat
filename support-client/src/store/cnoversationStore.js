import { create } from "zustand";
import { devtools } from "zustand/middleware";

import _ from "lodash";

const store = (set, get) => ({
	conversations: [],
	selectedConversation: {},
	availableCapactiy: 4,
	setSelectedConversation: (conversation) => {
		set({ selectedConversation: { ...conversation } });
	},
	assignChat: ({ user, conversation }) => {
		set({
			availableCapactiy: get().availableCapactiy - 1,
			conversations: [
				{
					id: conversation,
					socketId: user.socketId,
					username: user.username,
					messages: [],
					status: "active",
				},
				...get().conversations,
			],
		});

		if (Object.keys(get().selectedConversation).length === 0) {
			let firstActive = get().conversations.filter(
				(conversation) => conversation.status === "active"
			)[0];

			if (firstActive) {
				set({ selectedConversation: firstActive });
			} else {
				set({ selectedConversation: get().conversations.slice(0)[0] });
			}
		}
	},
	endConversation: (conversationId) => {
		let selectedConversation = get().conversations.filter(
			(conversation) => conversation.id === conversationId
		)[0];

		selectedConversation.status = "inactive";

		let updatedConversations = get().conversations.map((conversation) =>
			conversation.id === conversationId ? selectedConversation : conversation
		);

		updatedConversations = _.sortBy(updatedConversations, [
			(conversation) => {
				return conversation.status;
			},
		]);

		set({
			conversations: updatedConversations,
		});

		if (selectedConversation.id === conversationId) {
			set({
				selectedConversation: get().conversations.filter(
					(conversation) => conversation.id === conversationId
				)[0],
			});
		}

		if (get().availableCapactiy < 4) {
			set({ availableCapactiy: get().availableCapactiy + 1 });
		}
	},
	closeConversation: (conversationId) => {
		let updatedConversations = get().conversations.filter(
			(conversation) => conversation.id !== conversationId
		);

		set({ conversations: updatedConversations });
		if (updatedConversations.length > 0) {
			set({ selectedConversation: get().conversations.slice(0)[0] });
		} else {
			set({ selectedConversation: {} });
		}
	},
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
});

export const useConversationStore = create(devtools(store));
