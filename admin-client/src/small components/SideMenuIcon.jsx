/* eslint-disable react/prop-types */
import { useAppStore } from "../store/appStore";

export default function SideMenuIcon({ children, window }) {
	const { activeWindow, setActiveWindow } = useAppStore();

	return (
		<div
			className={`${
				activeWindow === window ? "bg-amber-500" : ""
			} cursor-pointer p-[6px] rounded-xl`}
			onClick={() => {
				setActiveWindow(window);
			}}
		>
			{children}
		</div>
	);
}
