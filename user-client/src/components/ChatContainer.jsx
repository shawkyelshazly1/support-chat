import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";

export default function ChatContainer() {
	return (
		<div className="w-full h-full flex flex-col gap-2 px-4 py-2">
			<MessagesContainer />
			<MessageInput />
		</div>
	);
}
