import { useState } from "react";
import { useChatStore } from "../store/chat";
import { toast } from "react-hot-toast";

export default function Login() {
	const { connectUser } = useChatStore();
	const [name, setname] = useState("");

	// handle user connection with server
	const handleConnect = (e) => {
		e.preventDefault();
		if (name.trim() === "") {
			setname("");
			e.target[0].value = "";
			toast.error("Please enter a valid name");
		} else {
			connectUser();
			setname("");
			e.target[0].value = "";
		}
	};

	return (
		<div className="flex w-full h-full items-center justify-center">
			<form onSubmit={(e) => handleConnect(e)} className="flex flex-col gap-4">
				<input
					required
					type="text"
					placeholder="Enter your name"
					name="customerName"
					onChange={(e) => {
						setname(e.target.value);
					}}
					className="py-2 px-4 rounded-2xl text-lg focus:outline-none border-[1px] border-slate-500"
				/>
				<button
					type="submit"
					className="text-2xl font-semibold bg-cyan-400 text-white py-2 px-4 rounded-3xl"
				>
					Contact Support
				</button>
			</form>
		</div>
	);
}
