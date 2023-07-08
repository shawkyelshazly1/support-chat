/* eslint-disable react/prop-types */
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";
import { socket } from "../socket";
import { useSupportStore } from "../store/supportStore";

export default function ChatContainer({ conversation }) {
	const { addMessage } = useSupportStore();
	useEffect(() => {
		socket.on("recieve-message", ({ conversation, message }) => {
			addMessage(conversation, message);
		});

		return () => {
			socket.off("recieve-message");
		};
	}, []);

	return (
		<div className="w-full h-full flex flex-col gap-2 px-2 py-2 border-x-2 max-h-[calc(100vh-6vh)]">
			<p className="font-semibold text-xl text-blue-400 ml-4">
				{conversation.username}
			</p>
			<hr />
			<MessagesContainer conversationId={conversation.id} />
			<MessageInput conversationId={conversation.id} />
		</div>
	);
}
