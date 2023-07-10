import { useEffect } from "react";
import { socket } from "../socket";
import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";
import { useChatStore } from "../store/chatStore";

export default function ChatContainer() {
	const {
		inQueue,
		endConversation,
		addInfoMessage,
		sendMessage,
		conversationStatus,
		username,
		startSupportConnection,
		chatMessages,
		supportData,
		reconnect,
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

		socket.on("terminated", () => {
			endConversation();
			sendMessage({
				content: `Conversation ended!`,
				type: "info",
			});
		});

		socket.on("support-disconnect", () => {
			sendMessage({
				content: `Support disconnected, Something went wrong!`,
				type: "info",
			});
			socket.emit("user-connect", { username });
			reconnect();
		});

		return () => {
			clearInterval(pingQueueStatusTimer);
			socket.off("pong-queue");
			socket.off("get-messages-history");
			socket.off("support-connected");
			socket.off("recieve-message");
			socket.off("terminated");
			socket.off("support-disconnect");
		};
	}, [chatMessages, inQueue]);

	return (
		<div className="w-full h-full flex flex-col gap-2 px-4 py-2">
			<MessagesContainer />
			{conversationStatus === "inactive" && !inQueue ? (
				<button
					onClick={() => {
						location.reload();
					}}
					className="bg-green-500 w-fit self-center text-white font-semibold py-2 px-4 rounded-2xl cursor-pointer my-2"
				>
					Close Conversation
				</button>
			) : (
				<></>
			)}
			<MessageInput />
		</div>
	);
}
