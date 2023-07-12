
import { FcOnlineSupport } from "react-icons/fc";

export default function NavbarLogo() {
	return (
		<div className="flex flex-row gap-4 items-center px-4">
			<FcOnlineSupport size={40} />
			<h1 className="text-2xl font-mono font-black logo lg:block xl:block md:block hidden">
				Ultimate Desk
			</h1>
		</div>
	);
}
