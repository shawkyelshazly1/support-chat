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
		availableCapactiy,
		addMessagesHistory,
		selectedConversation,
	} = useSupportStore();

	useEffect(() => {
		let pingQueueTimer = null;

		if (availableCapactiy > 0) {
			pingQueueTimer = setInterval(() => {
				socket.emit("assign-chat-ping");
				if (availableCapactiy <= 0) clearInterval(pingQueueTimer);
			}, 5000);
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

		return () => {
			clearInterval(pingQueueTimer);
			socket.off("assign-chat-pong");
			socket.off("user-joined");
			socket.off("recieve-messages-history");
		};
	}, [availableCapactiy]);

	console.log(selectedConversation);

	return (
		<div className="flex flex-row gap-2 w-full h-full ">
			<ConversationsSection />

			{selectedConversation === {} ? <></> : <ChatContainer />}

			<DocumentationSection />
		</div>
	);
}
