import ActiveWindow from "../components/ActiveWindow";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";

export default function MainApp() {
	return (
		<div className="flex flex-row w-full h-full">
			<Sidemenu />
			<div className="flex flex-1 flex-col w-full h-full bg-[#F0F3F8] rounded-l-[50px] px-6 pt-6">
				<Navbar />
				<ActiveWindow />
			</div>
		</div>
	);
}
