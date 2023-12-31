import { useConversationStore } from "../store/cnoversationStore";
import ConversationCard from "./ConversationCard";

export default function ConversationsSection() {
	const { conversations } = useConversationStore();

	return (
		<div className="flex flex-col border-r-[1px] w-fit md:w-[18%] lg:w-[18%] xl:w-[18%]">
			{conversations.map((conversation) => (
				<ConversationCard conversation={conversation} key={conversation.id} />
			))}
		</div>
	);
}
