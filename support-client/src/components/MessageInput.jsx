/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useSupportStore } from "../store/supportStore";
import { toast } from "react-hot-toast";

export default function MessageInput({ conversationId }) {
	const { addMessage } = useSupportStore();
	const [message, setMessage] = useState("");

	// handle submitting the form to send the message to server
	const handleSendingMessage = (e) => {
		e.preventDefault();

		if (message.trim() === "") {
			setMessage("");
			e.target[0].value = "";
			toast.error("please enter a message to send");
		} else {
			addMessage({
				content: message.trim(),
				timeStamp: Date.now(),
				type: "support",
				conversationId,
			});
			setMessage("");
			e.target[0].value = "";
		}
	};

	return (
		<form
			onSubmit={(e) => handleSendingMessage(e)}
			className="flex flex-row w-full  gap-2 items-center "
		>
			<input
				className="py-2 px-4 flex-1 rounded-2xl text-lg focus:outline-none border-[1px] border-slate-500"
				type="text"
				onChange={(e) => {
					setMessage(e.target.value);
				}}
				required
			/>
			<button type="submit">
				<BsFillSendFill size={40} color="00A6ED" />
			</button>
		</form>
	);
}
