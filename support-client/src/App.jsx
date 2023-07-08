import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import { useSupportStore } from "./store/supportStore";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {
	const { setSocketClient, disconnectSupport } = useSupportStore();

	useEffect(() => {
		function onConnect() {
			setSocketClient(socket);
		}

		function onDisconnect() {
			disconnectSupport();
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	const { isConnected } = useSupportStore();

	return (
		<div className="w-full h-screen">
			{!isConnected ? <Login /> : <MainApp />}
			<Toaster />
		</div>
	);
}

export default App;
