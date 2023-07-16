import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { useSupportStore } from "../store/supportStore";

export default function RootLayout() {
	const { checkAuth } = useSupportStore();

	// validate auth on layout mount
	useEffect(() => {
		console.log("test");
		checkAuth();
	}, []);

	return (
		<div className="  w-full h-screen">
			<Outlet />
			<Toaster />
		</div>
	);
}
