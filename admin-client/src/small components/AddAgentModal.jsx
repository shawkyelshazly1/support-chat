import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import AddAgentForm from "./AddAgentForm";

export default function AddAgentModal() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const handleClose = () => {
		setIsOpen(false);
	};

	function openModal() {
		setIsOpen(true);
	}

	return (
		<div>
			<Button
				onClick={() => {
					openModal();
				}}
				variant="contained"
				color="success"
				startIcon={<Add />}
			>
				Add Agent
			</Button>
			<Dialog open={modalIsOpen} onClose={handleClose}>
				<DialogTitle>Add Agent</DialogTitle>
				<DialogContent>
					<AddAgentForm closeModal={handleClose} />
				</DialogContent>
			</Dialog>
		</div>
	);
}
