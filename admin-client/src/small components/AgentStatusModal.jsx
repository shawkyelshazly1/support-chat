import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { useState } from "react";

import { toast } from "react-hot-toast";

export default function AgentStatusModal({
	settingsFormData,
	setSettingsFormData,
}) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [statusData, setStatusData] = useState({ name: "", color: "" });

	const handleClose = () => {
		setIsOpen(false);
		setStatusData({ name: "", color: "" });
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

	const handleAddStatus = () => {
		if (Object.values(statusData).every((item) => item.trim() !== "")) {
			setSettingsFormData({
				...settingsFormData,
				agentStatus: [...settingsFormData.agentStatus, statusData],
			});
			handleClose();
		} else {
			toast.error("Please enter information");
		}
	};

	return (
		<div className="flex justify-center ">
			<Button
				variant="contained"
				color="primary"
				onClick={openModal}
				className="mx-auto flex flex-row gap-2 items-center justify-center text-lg py-2 px-4 font-semibol rounded-lg w-fit text-white"
			>
				Add New Status
			</Button>
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
							defaultValue={colors[0]}
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
								onClick={() => handleAddStatus()}
								type="submit"
								className="py-2 px-6 rounded-xl text-white bg-green-500 font-black"
							>
								Add
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
