import { useEffect } from "react";
import { useSupportStore } from "../store/supportStore";
import ChatContainer from "./ChatContainer";
import { socket } from "../socket";

export default function ConversationsContainer() {
	const { conversations, assignChat, availableCapactiy, addMessagesHistory } =
		useSupportStore();

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
			console.log(data);
			addMessagesHistory(data.conversation, data.messages);
		});

		return () => {
			clearInterval(pingQueueTimer);
			socket.off("assign-chat-pong");
			socket.off("user-joined");
			socket.off("recieve-messages-history");
		};
	}, [availableCapactiy]);

	return (
		<div className="felx flex-1 grid grid-flow-col grid-cols-auto ">
			{conversations.map((conversation) => (
				<ChatContainer key={conversation.id} conversation={conversation} />
			))}
		</div>
	);
}
