import { Toaster } from "react-hot-toast";
import ChatContainer from "./components/ChatContainer";
import Login from "./components/Login";
import { useChatStore } from "./store/chat";

function App() {
	const { isConnected } = useChatStore();

	return (
		<div className="w-full h-screen">
			{!isConnected ? <Login /> : <ChatContainer />}
			<Toaster />
		</div>
	);
}

export default App;
