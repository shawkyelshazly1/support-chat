import { useEffect } from "react";
import ConversationsContainer from "../components/ConversationsContainer";
import { useSupportStore } from "../store/supportStore";

import { socket } from "../socket";

export default function ConversationsPage() {
	const { setSocketClient, logout } = useSupportStore();

	useEffect(() => {
		function onConnect() {
			setSocketClient(socket);
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

	return (
		<div className="flex flex-row  w-full h-full ">
			<ConversationsContainer />
		</div>
	);
}
