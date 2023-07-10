import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import { useAdminStore } from "./store/adminStore";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {
	const { isConnected, disconnectAdmin, connectAdmin } = useAdminStore();

	useEffect(() => {
		console.log(socket);
		function onConnect() {
			connectAdmin(socket);
		}

		function onDisconnect() {
			disconnectAdmin();
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	return (
		<div className="flex  w-full h-screen">
			{isConnected ? <MainApp /> : <Login />}
			<Toaster />
		</div>
	);
}

export default App;
