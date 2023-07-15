/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAdminStore } from "../store/adminStore";
import _ from "lodash";
import AgentStatusSection from "../small components/settings_form/AgentStatusSection";
import axiosInstance from "../axiosConfig";
import { toast } from "react-hot-toast";

export default function SettingsForm() {
	const { admin, updateSettings } = useAdminStore();
	let {
		_id,
		__v,
		createdAt,
		updatedAt,
		admin: adminData,
		...settings
	} = admin.settings;

	const [settingsFormData, setSettingsFormData] = useState(settings);

	const handleFieldChange = (e) => {
		if (e.target.type === "number")
			setSettingsFormData({
				...settingsFormData,
				[e.target.name]: parseInt(e.target.value),
			});
		else
			setSettingsFormData({
				...settingsFormData,
				[e.target.name]: e.target.value.trim(),
			});
	};

	const handleSubmitSettings = () => {
		if (!isNaN(settingsFormData.sla))
			axiosInstance
				.post("settings", { settings: settingsFormData })
				.then((res) => {
					toast.success("Settings Updated.");
					updateSettings(res.data);
				})
				.catch((err) => {
					toast.error("Something went wrong, Try save again.");
				});
		else {
			toast.error("SLA is required.");
		}
	};

	return (
		<div className="w-full h-full mt-6 flex-col flex justify-between">
			<div className="flex flex-col lg:flex-row xl:flex-row  lg:justify-evenly xl:justify-evenly gap-6  xl:gap-48 lg:gap-48 w-full  ">
				{/* Left column */}
				<div className="flex flex-col lg:gap-8  xl:gap-8 gap-6  w-3/5">
					<div className="flex flex-row justify-between w-full">
						<h1 className="text-lg font-semibold">{'SLA "seconds":'}</h1>
						<input
							onChange={(e) => handleFieldChange(e)}
							type="number"
							name="sla"
							defaultValue={settingsFormData.sla}
							min={0}
							value={settingsFormData.sla}
							className="py-1 px-2 rounded-lg focus:outline-none border-[1px] border-[#cdd3dc] focus:border-[1px] focus:border-[#F59E0B] w-2/4"
						/>
					</div>
				</div>
				{/* Right column */}
				<div className="flex flex-col lg:gap-8  xl:gap-8 gap-6  w-3/5">
					<AgentStatusSection
						setSettingsFormData={setSettingsFormData}
						settingsFormData={settingsFormData}
					/>
				</div>
			</div>
			<div className="flex flex-row flex-grow basis-[100%]  items-center justify-center gap-4">
				<button
					type="submit"
					disabled={_.isEqual(settingsFormData, settings)}
					className={`text-white py-2 px-6 text-xl rounded-lg font-semibold ${
						_.isEqual(settingsFormData, settings)
							? "bg-slate-300 cursor-not-allowed"
							: "bg-green-500 "
					}`}
					onClick={() => {
						handleSubmitSettings();
					}}
				>
					Save
				</button>
				{_.isEqual(settingsFormData, settings) ? (
					<></>
				) : (
					<button
						onClick={() => setSettingsFormData(settings)}
						type="reset"
						className="text-white py-2 px-6 text-xl rounded-lg bg-red-500 font-semibold"
					>
						Reset
					</button>
				)}
			</div>
		</div>
	);
}
