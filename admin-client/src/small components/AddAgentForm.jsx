import axiosInstance from "../axiosConfig";
import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { toast } from "react-hot-toast";
import FormSuccessModal from "./FormSuccessModal";

export default function AddAgentForm({ closeModal }) {
	const { admin } = useAdminStore();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
		settingsId: admin.settings._id,
		company: admin.company,
		api_key: admin.settings.api_key,
	});

	const [results, setResults] = useState(null);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
	};

	useEffect(() => {
		return () => {
			setResults(null);
		};
	}, []);

	const handleFormSubmission = (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			toast.error("Password & confirm Password must match!", {
				position: "bottom-center",
			});
			return;
		}

		let { confirmPassword, ...agentData } = formData;

		axiosInstance
			.post("agent/register", agentData)
			.then((res) => {
				toast.success("Agent Created.");
				setFormData({
					firstName: "",
					lastName: "",
					password: "",
					confirmPassword: "",
					settingsId: admin.settings._id,
					company: admin.company,
					api_key: admin.settings.api_key,
				});

				setResults({
					username: res.data.username,
					password: formData.password,
				});
			})
			.catch((error) => {
				toast.error(error.response.data.error, { position: "bottom-center" });
			});
	};

	return results !== null ? (
		<FormSuccessModal results={results} closeModal={closeModal} />
	) : (
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
