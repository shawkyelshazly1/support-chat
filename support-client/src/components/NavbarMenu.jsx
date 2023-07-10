import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useSupportStore } from "../store/supportStore";
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function NavbarMenu() {
	const { currentStatus, changeStatus, disconnectSupport, conversations } =
		useSupportStore();
	const [anchorEl, setAnchorEl] = useState(null);
	let open = Boolean(anchorEl);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		if (conversations.length > 0) {
			alert("Please close all conversations before logging out.");
		} else {
			disconnectSupport();
			setAnchorEl(null);
			location.reload();
		}
	};

	return (
		<>
			<Button
				className={`flex flex-row items-center justify-center gap-2 ${
					currentStatus === "online" ? "bg-green-400" : "bg-red-400"
				} `}
				style={{
					backgroundColor: currentStatus === "online" ? "#87B440" : "#E33A4B",
					color: "white",
					fontWeight: "bold",
				}}
				endIcon={<BiSolidDownArrow />}
				id="menu-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				{}
				{currentStatus}
			</Button>
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
				<MenuItem
					style={{ fontWeight: "bold" }}
					onClick={() => {
						changeStatus("online");
						setAnchorEl(null);
					}}
				>
					Online
				</MenuItem>

				<MenuItem
					style={{ fontWeight: "bold" }}
					onClick={() => {
						changeStatus("offline");
						setAnchorEl(null);
					}}
				>
					Offline
				</MenuItem>
				<MenuItem
					style={{ fontWeight: "bold" }}
					onClick={() => {
						handleLogout();
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
