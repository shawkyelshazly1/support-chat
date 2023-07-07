/* eslint-disable react/prop-types */
import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";

export default function ChatContainer({ conversation }) {
	return (
		<div className="w-full h-full flex flex-col gap-2 px-2 py-2 border-x-2 max-h-[calc(100vh-6vh)]">
			<MessagesContainer conversationId={conversation.id} />
			<MessageInput conversationId={conversation.id} />
		</div>
	);
}
