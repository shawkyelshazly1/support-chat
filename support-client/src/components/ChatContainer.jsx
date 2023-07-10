/* eslint-disable react/prop-types */

import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";

import { useSupportStore } from "../store/supportStore";
import ConversationOptionsMenu from "./ConversationOptionsMenu";

export default function ChatContainer() {
	const { selectedConversation } = useSupportStore();

	return (
		<div className="w-full h-full flex-1 flex flex-col gap-2 px-2 py-2  max-h-[calc(100vh-6vh)]">
			{selectedConversation === {} ? (
				<></>
			) : (
				<>
					<div className="flex flex-row justify-between items-center">
						<p className="font-bold text-2xl text-gray-500 ml-4 py-2">
							{selectedConversation.username}
						</p>
						<ConversationOptionsMenu />
					</div>
					<hr />
					<MessagesContainer />
					<MessageInput />
				</>
			)}
		</div>
	);
}
