import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSupportStore } from "../store/supportStore";
import { socket } from "../socket";
import axiosInstance from "../axiosConfig";

export default function LoginForm() {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const { login } = useSupportStore();

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmission = (e) => {
		e.preventDefault();

		// validate form formData nor empty
		if (Object.values(formData).some((value) => value.trim() === "")) {
			toast.error("Please enter valid login information.");
			return;
		}

		// login user through server
		axiosInstance
			.post("/login", formData)
			.then((res) => {
				toast.success("Logged In.");
				login(res.data);
				socket.connect();
				socket.emit("support:connect", { ...res.data.support });
			})
			.catch((error) => {
				toast.error(error.response.data.error, { position: "bottom-center" });
			});
	};

	return (
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
					handleInputChange(e);
				}}
			/>
			<input
				type="password"
				name="password"
				className="focus:outline-none rounded-2xl border-[1px] py-2 px-4 text-lg "
				placeholder="Password"
				required
				onChange={(e) => {
					handleInputChange(e);
				}}
			/>
			<button
				type="submit"
				className="text-xl text-white font-semibold bg-blue-400 rounded-2xl py-2 px-4 mt-3"
			>
				Login
			</button>
		</form>
	);
}
