import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSupportStore } from "../store/supportStore";
import { socket } from "../socket";

export default function Login() {
	const [formData, setformData] = useState({ username: "", password: "" });
	const { connectSupport } = useSupportStore();

	const handleFormSubmission = (e) => {
		e.preventDefault();

		if (formData.username === "" || formData.password === "")
			toast.error("please enter valid login information");
		else {
			connectSupport({ ...formData });
			socket.connect();
			socket.emit("support-connect", { username: formData.username });
			setformData({ username: "", password: "" });
			e.target[0].value = "";
			e.target[1].value = "";
		}
	};

	return (
		<div className="w-full h-full flex items-center justify-center">
			<form
				onSubmit={(e) => handleFormSubmission(e)}
				className="flex flex-col gap-2 text-center"
			>
				<h1 className="text-4xl font-semibold font-mono text-blue-500 mb-8">
					Support Login
				</h1>
				<input
					type="text"
					name="username"
					className="focus:outline-none rounded-2xl border-[1px] py-2 px-4 text-lg "
					placeholder="Username"
					required
					onChange={(e) => {
						setformData({
							...formData,
							[e.target.name]: e.target.value.trim(),
						});
					}}
				/>
				<input
					type="password"
					name="password"
					className="focus:outline-none rounded-2xl border-[1px] py-2 px-4 text-lg "
					placeholder="Password"
					required
					onChange={(e) => {
						setformData({
							...formData,
							[e.target.name]: e.target.value.trim(),
						});
					}}
				/>
				<button
					type="submit"
					className="text-xl text-white font-semibold bg-blue-400 rounded-2xl py-2 px-4 mt-3"
				>
					Login
				</button>
			</form>
		</div>
	);
}
