import { useEffect } from "react";
import { useChatStore } from "../store/chat";
import Message from "./Message";

export default function MessagesContainer() {
	const { chatMessages } = useChatStore();

	useEffect(() => {
		let container = document.querySelector(".messages-container");
		container.scrollTo(0, container.scrollHeight);
	}, [chatMessages]);

	return (
		<div className="flex flex-1 gap-3 flex-col-reverse w-full overflow-auto messages-container mt-auto">
			{chatMessages.map((message, idx) => (
				<Message key={idx} message={message} />
			))}
		</div>
	);
}
