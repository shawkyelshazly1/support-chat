import { Toaster } from "react-hot-toast";
import ChatContainer from "./components/ChatContainer";
import Login from "./components/Login";
import { useChatStore } from "./store/chatStore";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {
	const { isConnected, connectUser, disconnectUser } = useChatStore();

	useEffect(() => {
		function onConnect() {
			connectUser(socket);
		}

		function onDisconnect() {
			disconnectUser();
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	return (
		<div className="w-full h-screen">
			{!isConnected ? <Login /> : <ChatContainer />}
			<Toaster />
		</div>
	);
}

export default App;
