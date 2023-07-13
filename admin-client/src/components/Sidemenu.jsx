import { AiOutlineDashboard } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { PiChatsFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { useAppStore } from "../store/appStore";
import SideMenuIcon from "../small components/SideMenuIcon";
import { useAdminStore } from "../store/adminStore";
import { socket } from "../socket";

export default function Sidemenu() {
	const { activeWindow } = useAppStore();
	const { logout, admin } = useAdminStore();
	return (
		<div className="w-[6vw] pt-6 flex flex-col items-center gap-20 my-3">
			<AiOutlineDashboard size={45} className="" color="#070F36" />
			<div className="flex flex-col items-center gap-6 ">
				<SideMenuIcon window={"dashboard"}>
					<BsBarChartFill
						size={35}
						color={activeWindow === "dashboard" ? "white" : "#97A4B7"}
					/>
				</SideMenuIcon>
				<SideMenuIcon window={"conversations"}>
					<PiChatsFill
						size={35}
						color={activeWindow === "conversations" ? "white" : "#97A4B7"}
					/>
				</SideMenuIcon>
				{admin.role === "manager" ? (
					<></>
				) : (
					<SideMenuIcon window={"settings"}>
						<IoSettings
							size={35}
							color={activeWindow === "settings" ? "white" : "#97A4B7"}
						/>
					</SideMenuIcon>
				)}
			</div>

			<MdLogout
				size={35}
				color="#97A4B7"
				className="cursor-pointer mt-auto mb-12"
				onClick={() => {
					logout();
					socket.disconnect();
				}}
			/>
		</div>
	);
}
