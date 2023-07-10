import { useSupportStore } from "../store/supportStore";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
	const { connectedSupport } = useSupportStore();

	return (
		<div className="w-full flex flex-row shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  py-4 px-4 h-[6vh]">
			<div className="flex flex-row gap-2 ml-auto items-center ">
				<p className="text-lg font-bold text-gray-400">
					{connectedSupport.username}
				</p>
				<NavbarMenu />
			</div>
		</div>
	);
}
