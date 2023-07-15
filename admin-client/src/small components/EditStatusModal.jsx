/* eslint-disable react/prop-types */
import {
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { useState } from "react";

import { toast } from "react-hot-toast";
import { LuEdit } from "react-icons/lu";
import _ from "lodash";

export default function EditStatusModal({
	settingsFormData,
	setSettingsFormData,
	selectedStatus,
}) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [statusData, setStatusData] = useState({
		name: selectedStatus.name,
		color: selectedStatus.color,
	});

	const handleClose = () => {
		setIsOpen(false);
		
	};

	function openModal() {
		setIsOpen(true);
	}

	let colors = [
		"#87B440",
		"#E33A4B",
		"#F59E0B",
		"#8A3FFC",
		"#0043CE",
		"#6f6f6f",
	];

	const handleEditStatus = () => {
		if (Object.values(statusData).every((item) => item.trim() !== "")) {
			setSettingsFormData({
				...settingsFormData,
				agentStatus: settingsFormData.agentStatus.map((item) =>
					_.isEqual(item, selectedStatus) ? statusData : item
				),
			});

			handleClose();
		} else {
			toast.error("Please enter information");
		}
	};

	return (
		<div className="flex justify-center ">
			<LuEdit
				onClick={openModal}
				size={20}
				className="hover:text-teal-500 cursor-pointer"
			/>
			<Dialog open={modalIsOpen} onClose={handleClose}>
				<DialogTitle>Agent Status Control</DialogTitle>
				<DialogContent>
					<div className="flex flex-col gap-2 justify-center   py-4 px-4 w-[500px]">
						<h1 className="text-lg font-semibold">Status Name </h1>
						<input
							type="text"
							name="name"
							placeholder="Status Name"
							value={statusData.name}
							onChange={(e) =>
								setStatusData({
									...statusData,
									[e.target.name]: e.target.value,
								})
							}
							className=" focus:outline-none py-1 px-4 w-full rounded-lg text-lg border-[1px] border-gray-400"
						/>
						<h1 className="text-lg font-semibold mt-4">Status Color </h1>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue={selectedStatus.color}
							row
							name="radio-buttons-group"
							onChange={(e) =>
								setStatusData({
									...statusData,
									[e.target.name]: e.target.value,
								})
							}
						>
							{colors.map((color, idx) => (
								<FormControlLabel
									key={idx}
									value={color}
									name="color"
									control={<Radio />}
									label={
										<span
											style={{ backgroundColor: color }}
											className=" text-white py-1 px-2 rounded-xl"
										>
											{statusData.name}
										</span>
									}
								/>
							))}
						</RadioGroup>
						<div className="flex flex-row gap-3 justify-center items-center w-full mt-6">
							<button
								onClick={() => handleEditStatus()}
								type="submit"
								className="py-2 px-6 rounded-xl text-white bg-green-500 font-black"
							>
								Update
							</button>
							<button
								type="reset"
								onClick={handleClose}
								className="py-2 px-6 rounded-xl text-white bg-red-500 font-black"
							>
								Cancel
							</button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
