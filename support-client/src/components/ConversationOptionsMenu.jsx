import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useSupportStore } from "../store/supportStore";
import { socket } from "../socket";

export default function ConversationOptionsMenu() {
	const { selectedConversation, endConversation, closeConversation } =
		useSupportStore();
	const [anchorEl, setAnchorEl] = useState(null);
	let open = Boolean(anchorEl);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEndConversation = () => {
		endConversation(selectedConversation.id);
		socket.emit("terminate-customer", {
			conversationId: selectedConversation.id,
		});

		setAnchorEl(null);
	};

	const handleCloseConversation = () => {
		setAnchorEl(null);
		closeConversation(selectedConversation.id);
	};

	return (
		<>
			<BsThreeDotsVertical
				className="cursor-pointer"
				fontWeight={"bold"}
				color="gray"
				size={20}
				id="menu-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			/>
			<Menu
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id="conversation-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "menu-button",
				}}
			>
				{selectedConversation.status === "active" ? (
					<MenuItem
						onClick={() => {
							handleEndConversation();
						}}
					>
						End Conversation
					</MenuItem>
				) : (
					<MenuItem
						onClick={() => {
							handleCloseConversation();
						}}
					>
						Close Conversation
					</MenuItem>
				)}
			</Menu>
		</>
	);
}
