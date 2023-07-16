/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useConversationStore } from "../store/cnoversationStore";
import { toast } from "react-hot-toast";
import { socket } from "../socket";

export default function MessageInput() {
	const { addMessage, selectedConversation } = useConversationStore();
	const [message, setMessage] = useState("");
	const [formStatus, setFormStatus] = useState(
		selectedConversation.status === "inactive"
	);

	// handle submitting the form to send the message to server
	const handleSendingMessage = (e) => {
		e.preventDefault();

		if (message.trim() === "") {
			setMessage("");
			e.target[0].value = "";
			toast.error("please enter a message to send");
		} else {
			let newMessage = {
				content: message.trim(),
				timeStamp: Date.now(),
				type: "support",
			};
			addMessage(selectedConversation.id, newMessage);

			socket.emit("conversation:message", {
				conversation: selectedConversation.id,
				message: newMessage,
			});

			setMessage("");
			e.target[0].value = "";
		}
	};

	useEffect(() => {
		if (selectedConversation.status === "inactive") {
			setFormStatus(true);
		} else {
			setFormStatus(false);
		}
	}, [selectedConversation.status]);

	return (
		<form
			onSubmit={(e) => handleSendingMessage(e)}
			className="flex flex-row w-full gap-2 items-center "
		>
			<input
				disabled={formStatus}
				className="py-2 px-4 h-[100px] flex-1 rounded-2xl text-lg focus:outline-none border-[1px] border-slate-500"
				type="text"
				onChange={(e) => {
					setMessage(e.target.value);
				}}
				required
			/>
			<button type="submit" disabled={formStatus}>
				<BsFillSendFill size={50} color="00A6ED" />
			</button>
		</form>
	);
}
