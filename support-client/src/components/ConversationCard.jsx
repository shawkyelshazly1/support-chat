import { useSupportStore } from "../store/supportStore";
import { VscDebugDisconnect } from "react-icons/vsc";
import { PiPlugsConnectedFill } from "react-icons/pi";

/* eslint-disable react/prop-types */
export default function ConversationCard({ conversation }) {
	const { setSelectedConversation, selectedConversation } = useSupportStore();

	return (
		<div
			onClick={() => {
				setSelectedConversation(conversation);
			}}
			className={`flex flex-row items-center ${
				conversation.status === "inactive" ? "text-[#5c5d797d]" : ""
			} gap-6 cursor-pointer border-[1px] px-4 py-4 hover:bg-slate-200  ${
				selectedConversation?.id === conversation?.id ? "bg-slate-300" : ""
			}`}
		>
			{conversation.status === "active" ? (
				<PiPlugsConnectedFill size={30} color="green" fontWeight="bold" />
			) : (
				<VscDebugDisconnect size={30} color="#5c5d797d" fontWeight="bold" />
			)}
			<div className={`flex flex-col gap-1 `}>
				<h1 className="font-semibold text-xl  truncate">
					{conversation.username}
				</h1>
				<p className="text-slate-400 truncate">
					{conversation.messages.slice(0)[0]?.content}
				</p>
			</div>
		</div>
	);
}
