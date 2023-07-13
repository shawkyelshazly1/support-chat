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
		reRouted,
	} = useChatStore();

	useEffect(() => {
		let pingQueueStatusTimer = undefined;

		if (inQueue) {
			pingQueueStatusTimer = setInterval(() => {
				socket.emit("user:queue", { username });
				if (!inQueue) {
					clearInterval(pingQueueStatusTimer);
				}
			}, 5000);
		}

		socket.on("user:queue", (data) => {
			addInfoMessage(data);
		});

		socket.on("user:support-connected", (supportData) => {
			startSupportConnection(supportData);
			addInfoMessage({
				content: `You are now connected with ${supportData.username}`,
				type: "info",
			});
			socket.emit("user:join", {
				conversation: supportData.conversation,
			});
		});

		socket.on("user:get-history", () => {
			let messages = chatMessages.filter(
				(message) => message.type === "customer"
			);

			if (!reRouted) {
				socket.emit("user:send-history", {
					conversation: supportData.conversation,
					messages,
				});
			}
		});

		socket.on("conversation:message", ({ _, message }) => {
			sendMessage(message);
		});

		socket.on("user:end-conversation", () => {
			endConversation();
			sendMessage({
				content: `Conversation ended!`,
				type: "info",
			});
		});

		socket.on("user:support-disconnect", () => {
			sendMessage({
				content: `Support disconnected, Something went wrong!`,
				type: "info",
			});
			socket.emit("user:connect", { username });
			reconnect();
		});

		return () => {
			clearInterval(pingQueueStatusTimer);
			socket.off("user:queue");
			socket.off("user:get-history");
			socket.off("user:support-connected");
			socket.off("conversation:message");
			socket.off("user:end-conversation");
			socket.off("user:support-disconnect");
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
