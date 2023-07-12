import ConversationsContainer from "./ConversationsContainer";
import Navbar from "./Navbar";

export default function MainApp() {
	return (
		<div className="w-full h-screen flex flex-col-reverse ">
			<ConversationsContainer />
			<Navbar />
		</div>
	);
}
