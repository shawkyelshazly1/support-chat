import { useEffect } from "react";
import { useSupportStore } from "../store/supportStore";
import Message from "./Message";

// eslint-disable-next-line react/prop-types
export default function MessagesContainer() {
	const { conversations, selectedConversation } = useSupportStore();

	let conversation = conversations.filter(
		(conversation) => conversation.id === selectedConversation.id
	)[0];

	useEffect(() => {
		let container = document.querySelector(".messages-container");
		container.scrollTo(0, container.scrollHeight);
	}, [conversations]);

	return (
		<div className="flex flex-1 gap-3 flex-col-reverse px-4 w-full overflow-auto messages-container mt-auto max-h-[calc(100vh-6vh)]">
			{selectedConversation === {} ? (
				<></>
			) : (
				conversation?.messages.map((message, idx) => (
					<Message key={idx} message={message} />
				))
			)}
		</div>
	);
}
