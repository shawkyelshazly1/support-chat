import { useEffect } from "react";
import { socket } from "../socket";
import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";
import { useChatStore } from "../store/chat";

export default function ChatContainer() {
	const { inQueue, addInfoMessage, username } = useChatStore();

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

		return () => {
			clearInterval(pingQueueStatusTimer);
			socket.off("pong-queue");
		};
	}, []);

	return (
		<div className="w-full h-full flex flex-col gap-2 px-4 py-2">
			<MessagesContainer />
			<MessageInput />
		</div>
	);
}
