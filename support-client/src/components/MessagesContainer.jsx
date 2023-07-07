import { useEffect } from "react";
import { useSupportStore } from "../store/supportStore";
import Message from "./Message";

// eslint-disable-next-line react/prop-types
export default function MessagesContainer({ conversationId }) {
	const { conversations } = useSupportStore();

	let selectedConversation = conversations.filter(
		(conversation) => conversation.id === conversationId
	)[0];

	useEffect(() => {
		let container = document.querySelector(".messages-container");
		container.scrollTo(0, container.scrollHeight);
	}, [conversations]);

	return (
		<div className="flex flex-1 gap-3 flex-col-reverse w-full overflow-auto messages-container mt-auto max-h-[calc(100vh-6vh)]">
			{selectedConversation.messages.map((message, idx) => (
				<Message key={idx} message={message} />
			))}
		</div>
	);
}
