import { useSupportStore } from "../store/supportStore";
import ConversationCard from "./ConversationCard";

export default function ConversationsSection() {
	const { conversations } = useSupportStore();

	return (
		<div className="flex flex-col border-r-[1px]   w-[15%]">
			{conversations.map((conversation) => (
				<ConversationCard conversation={conversation} key={conversation.id} />
			))}
		</div>
	);
}
