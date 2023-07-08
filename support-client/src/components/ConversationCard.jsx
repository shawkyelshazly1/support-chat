import { useSupportStore } from "../store/supportStore";

/* eslint-disable react/prop-types */
export default function ConversationCard({ conversation }) {
	const { setSelectedConversation, selectedConversation } = useSupportStore();

	

	return (
		<div
			className={`flex flex-col cursor-pointer gap-1 border-[1px] px-4 py-2 hover:bg-slate-200 ${
				selectedConversation?.id === conversation?.id ? "bg-slate-300" : ""
			}`}
			onClick={() => {
				setSelectedConversation(conversation);
			}}
		>
			<h1 className="font-semibold text-xl  ">{conversation.username}</h1>
			<p className="text-slate-400 ">You: this is great here man</p>
		</div>
	);
}
