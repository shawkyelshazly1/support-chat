import { useEffect } from "react";
import { useSupportStore } from "../store/supportStore";
import ChatContainer from "./ChatContainer";
import { socket } from "../socket";
import ConversationsSection from "./ConversationsSection";
import DocumentationSection from "./DocumentationSection";

export default function ConversationsContainer() {
	const {
		conversations,
		assignChat,
		addMessage,
		availableCapactiy,
		currentStatus,
		addMessagesHistory,
		selectedConversation,
		endConversation,
	} = useSupportStore();

	useEffect(() => {
		let pingQueueTimer = null;

		if (availableCapactiy > 0 && currentStatus === "online") {
			pingQueueTimer = setInterval(() => {
				socket.emit("assign-chat-ping");
				if (availableCapactiy <= 0) clearInterval(pingQueueTimer);
			}, 2000);
		}

		// receive assigned chats
		socket.on("assign-chat-pong", (data) => {
			assignChat(data);
		});

		socket.on("user-joined", (data) => {
			//ping customer for previous messages
			socket.emit("get-messages-history", { conversation: data.conversation });
		});

		socket.on("recieve-messages-history", (data) => {
			addMessagesHistory(data.conversation, data.messages);
		});

		socket.on("user-disconnected", (data) => {
			console.log(data);
			endConversation(data.conversationId);
			socket.emit("leave-room", { conversationId: data.conversationId });
		});

		return () => {
			clearInterval(pingQueueTimer);
			socket.off("assign-chat-pong");
			socket.off("user-joined");
			socket.off("recieve-messages-history");
			socket.off("user-disconnected");
		};
	}, [availableCapactiy,currentStatus]);

	useEffect(() => {
		socket.on("recieve-message", ({ conversation, message }) => {
			addMessage(conversation, message);
		});

		return () => {
			socket.off("recieve-message");
		};
	}, []);

	return (
		<div className="flex flex-row  w-full h-full ">
			{conversations.length > 0 ? (
				<>
					<ConversationsSection />

					{Object.keys(selectedConversation).length === 0 ? (
						<div className="w-full h-full flex items-center justify-center">
							<h1 className="text-2xl  italic font-black  text-emerald-500">
								Select a conversation.
							</h1>
						</div>
					) : (
						<>
							<ChatContainer />

							<DocumentationSection />
						</>
					)}
				</>
			) : (
				<div className="w-full h-full flex items-center justify-center">
					<h1 className="text-4xl font-semibold">Awaiting Customers.... </h1>
				</div>
			)}
		</div>
	);
}
