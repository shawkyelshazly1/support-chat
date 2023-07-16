import { useAppStore } from "../store/appStore";
import ConversationsDashboard from "../pages/ConversationsDashboard";
import RealtimeDashboard from "../pages/RealtimeDashboard";
import Settings from "../pages/Settings";
import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";
import { socket } from "../socket/socket";

export default function ActiveWindow() {
	const { activeWindow, setActiveWindow } = useAppStore();

	const { connectAdmin, logout, admin } = useAdminStore();

	useEffect(() => {
		function onConnect() {
			connectAdmin(socket);
		}

		function onDisconnect() {
			logout();
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	// to redirect manager from settings page only admin allowed
	useEffect(() => {
		if (admin.role === "manager" && activeWindow === "settings") {
			setActiveWindow("dashboard");
		}
	}, [activeWindow, admin.role]);

	return (
		<div className="w-full flex-1 flex mt-6">
			{activeWindow === "dashboard" ? (
				<RealtimeDashboard />
			) : (
				<>
					{activeWindow === "conversations" ? (
						<ConversationsDashboard />
					) : (
						<Settings />
					)}
				</>
			)}
		</div>
	);
}
