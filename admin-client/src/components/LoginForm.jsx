import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAdminStore } from "../store/adminStore";
import { socket } from "../socket";

export default function LoginForm() {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const { loginAdmin } = useAdminStore();

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmission = (e) => {
		e.preventDefault();

		// validate formData not empty
		if (Object.values(formData).some((value) => value.trim() === "")) {
			toast.error("Please enter valid login information.");
			return;
		}

		// validate user information & login

		if (Object.values(formData).every((value) => value.trim() === "admin")) {
			// login user
			toast.success("Logged in.");
			loginAdmin(formData);
			socket.connect();
			socket.emit("admin-connect");
			return;
		} else {
			toast.error("Wrong username or password.");
			return;
		}
	};

	return (
		<form
			className="flex flex-col gap-3 items-center"
			onSubmit={(e) => handleFormSubmission(e)}
		>
			<input
				type="text"
				placeholder="Username"
				name="username"
				className="py-2 px-4 rounded-3xl focus:outline-none text-xl focus:outline-amber-500"
				required
				onChange={(e) => handleInputChange(e)}
			/>
			<input
				type="password"
				placeholder="Password"
				name="password"
				className="py-2 px-4 rounded-3xl focus:outline-none text-xl focus:outline-amber-500"
				required
				onChange={(e) => handleInputChange(e)}
			/>
			<input
				type="submit"
				value="Login"
				className="text-xl font-semibold text-white bg-[#4a5b8e] py-2 px-4 w-2/4 rounded-2xl cursor-pointer mt-4"
			/>
		</form>
	);
}
