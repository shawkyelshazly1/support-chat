import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import AddManagerForm from "./AddManagerForm";

export default function AddManagerModal() {
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
				color="warning"
				startIcon={<Add />}
			>
				Add Manager
			</Button>
			<Dialog open={modalIsOpen} onClose={handleClose}>
				<DialogTitle>Add Manager</DialogTitle>
				<DialogContent>
					<AddManagerForm closeModal={handleClose} />
				</DialogContent>
			</Dialog>
		</div>
	);
}
