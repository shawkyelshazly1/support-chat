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
				socket.emit("support:new-conversation");
				if (availableCapactiy <= 0) clearInterval(pingQueueTimer);
			}, 2000);
		}

		// receive assigned chats
		socket.on("support:new-conversation", (data) => {
			assignChat(data);
		});

		socket.on("conversation:user-joined", (data) => {
			//ping customer for previous messages
			socket.emit("support:get-history", { conversation: data.conversation });
		});

		socket.on("support:receive-history", (data) => {
			addMessagesHistory(data.conversation, data.messages);
		});

		socket.on("user:disconnected", (data) => {
			console.log(data);
			endConversation(data.conversationId);
			socket.emit("support:leave", { conversationId: data.conversationId });
		});

		return () => {
			clearInterval(pingQueueTimer);
			socket.off("support:new-conversation");
			socket.off("conversation:user-joined");
			socket.off("support:receive-history");
			socket.off("user:disconnected");
		};
	}, [availableCapactiy, currentStatus]);

	useEffect(() => {
		socket.on("conversation:message", ({ conversation, message }) => {
			addMessage(conversation, message);
		});

		return () => {
			socket.off("conversation:message");
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
