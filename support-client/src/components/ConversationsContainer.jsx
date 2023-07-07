import { useSupportStore } from "../store/supportStore";
import ChatContainer from "./ChatContainer";

export default function ConversationsContainer() {
	const { conversations } = useSupportStore();
	console.log(conversations);
	return (
		<div className="felx flex-1 grid grid-flow-col grid-cols-auto ">
			{conversations.map((conversation) => (
				<ChatContainer key={conversation.id} conversation={conversation} />
			))}
		</div>
	);
}
