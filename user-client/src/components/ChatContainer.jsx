import { useEffect } from "react";
import { socket } from "../socket";
import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";
import { useChatStore } from "../store/chatStore";

export default function ChatContainer() {
	const {
		inQueue,
		addInfoMessage,
		sendMessage,
		username,
		startSupportConnection,
		chatMessages,
		supportData,
	} = useChatStore();

	useEffect(() => {
		let pingQueueStatusTimer = undefined;

		if (inQueue) {
			pingQueueStatusTimer = setInterval(() => {
				socket.emit("ping-queue", { username });
				if (!inQueue) {
					clearInterval(pingQueueStatusTimer);
				}
			}, 5000);
		}

		socket.on("pong-queue", (data) => {
			addInfoMessage(data);
		});

		socket.on("support-connected", (supportData) => {
			startSupportConnection(supportData);
			addInfoMessage({
				content: `You are now connected with ${supportData.username}`,
				type: "info",
			});
			socket.emit("join-support-room", {
				conversation: supportData.conversation,
			});
		});

		socket.on("get-messages-history", () => {
			let messages = chatMessages.filter(
				(message) => message.type === "customer"
			);

			socket.emit("recieve-messages-history", {
				conversation: supportData.conversation,
				messages,
			});
		});

		socket.on("recieve-message", ({ _, message }) => {
			sendMessage(message);
		});

		return () => {
			clearInterval(pingQueueStatusTimer);
			socket.off("pong-queue");
			socket.off("get-messages-history");
			socket.off("support-connected");
			socket.off("recieve-message");
		};
	}, [chatMessages, inQueue]);

	return (
		<div className="w-full h-full flex flex-col gap-2 px-4 py-2">
			<MessagesContainer />
			<MessageInput />
		</div>
	);
}
