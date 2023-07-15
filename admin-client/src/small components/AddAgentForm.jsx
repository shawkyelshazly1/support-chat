import { useState } from "react";

export default function AddAgentForm({ closeModal }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
	};

	const handleFormSubmission = (e) => {
		e.preventDefault();
		console.log(formData);
		setFormData({
			firstName: "",
			lastName: "",
			username: "",
			password: "",
			confirmPassword: "",
		});
		closeModal();
	};

	return (
		<form
			onSubmit={(e) => handleFormSubmission(e)}
			className="flex flex-col  gap-4 items-start"
		>
			<div className="flex flex-row justify-evenly gap-4">
				<input
					onChange={handleInputChange}
					required
					name="firstName"
					type="text"
					className="focus:outline-none border-[1px] py-1 px-2 rounded-lg text-lg"
					placeholder="First Name"
				/>
				<input
					onChange={handleInputChange}
					required
					name="lastName"
					type="text"
					className="focus:outline-none border-[1px] py-1 px-2 rounded-lg text-lg"
					placeholder="Last Name"
				/>
			</div>

			<input
				onChange={handleInputChange}
				required
				name="username"
				type="text"
				className="focus:outline-none border-[1px] py-1 px-2 rounded-lg text-lg"
				placeholder="Username"
			/>

			<div className="flex flex-row justify-evenly gap-4">
				<input
					onChange={handleInputChange}
					required
					name="password"
					type="password"
					className="focus:outline-none border-[1px] py-1 px-2 rounded-lg text-lg"
					placeholder="Password"
				/>
				<input
					onChange={handleInputChange}
					required
					name="confirmPassword"
					type="password"
					className="focus:outline-none border-[1px] py-1 px-2 rounded-lg text-lg"
					placeholder="Confirm Password"
				/>
			</div>
			<div className="flex flex-row gap-3 justify-center items-center w-full mt-6">
				<button
					type="submit"
					className="py-2 px-6 rounded-xl text-white bg-green-500 font-black"
				>
					Add
				</button>
				<button
					type="reset"
					onClick={closeModal}
					className="py-2 px-6 rounded-xl text-white bg-red-500 font-black"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
