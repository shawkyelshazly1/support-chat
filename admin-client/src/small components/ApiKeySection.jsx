import { MdContentCopy } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { toast } from "react-hot-toast";
import { useAdminStore } from "../store/adminStore";

export default function ApiKeySection() {
	const [apiVisible, setApiVisible] = useState(false);

	const { isAuthenticated, accessToken } = useAdminStore();

	const [api_key, setApi_key] = useState("");

	useEffect(() => {
		const fetchAPIKey = async () => {
			await axiosInstance
				.get("api_key", {
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				})
				.then((res) => {
					setApi_key(res.data.api_key);
				})
				.catch((err) => {
					console.log(err);
					toast.error("Something went wrong!");
				});
		};
		if (isAuthenticated) {
			fetchAPIKey();
		}

		return () => {
			setApi_key("");
		};
	}, [isAuthenticated]);

	return (
		<div className="flex flex-col gap-4 w-full mt-4">
			<h1 className="text-2xl font-semibold">API Key </h1>
			<div className="flex flex-row items-center gap-6">
				<input
					readOnly
					id="api-key-field"
					type="text"
					onFocus={(e) => e.target.blur()}
					value={apiVisible ? api_key : "*".repeat(api_key.length)}
					className={` border-[1px] bg-white w-[80ch] py-1 px-2 rounded-lg select-none focus:outline-none`}
				/>

				<div className="flex flex-row gap-1 items-center">
					<button className="p-2 bg-white rounded-lg">
						{apiVisible ? (
							<AiOutlineEyeInvisible
								onClick={() => {
									setApiVisible(!apiVisible);
								}}
							/>
						) : (
							<AiOutlineEye
								onClick={() => {
									setApiVisible(!apiVisible);
								}}
							/>
						)}
					</button>
					<button className="p-2 bg-white rounded-lg">
						<MdContentCopy
							onClick={() => {
								navigator.clipboard.writeText(api_key);
								toast.success("API Key copied to clipboard.", {
									position: "bottom-center",
								});
							}}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
