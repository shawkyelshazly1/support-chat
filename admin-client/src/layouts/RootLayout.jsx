import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { useAdminStore } from "../store/adminStore";

export default function RootLayout() {
	const { checkAuth } = useAdminStore();

	// validate auth on layout mount
	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<div className="flex  w-full h-screen">
			<Outlet />
			<Toaster />
		</div>
	);
}
