import { useSupportStore } from "../store/supportStore";
import NavbarMenu from "./NavbarMenu";

import NavbarStats from "./NavbarStats";
import NavbarLogo from "./NavbarLogo";

export default function Navbar() {
	const { support } = useSupportStore();

	return (
		<div className="w-full flex gap-4 flex-row shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  py-4 px-4 h-[90px]">
			<NavbarLogo />
			<hr className="border-[1px]   mx-6 h-full" />
			<NavbarStats />
			<div className="flex flex-row gap-2 ml-auto items-center   xl:w-1/4 lg:w-1/6 justify-end">
				<p className="text-lg font-bold text-gray-400">
					{support.username}
				</p>
				<NavbarMenu />
			</div>
		</div>
	);
}
