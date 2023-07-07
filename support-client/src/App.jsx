import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import { useSupportStore } from "./store/supportStore";

function App() {
	const { isConnected } = useSupportStore();

	return (
		<div className="w-full h-screen">
			{!isConnected ? <Login /> : <MainApp />}
			<Toaster />
		</div>
	);
}

export default App;
