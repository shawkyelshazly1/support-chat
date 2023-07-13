import { AiOutlineDashboard } from "react-icons/ai";
import LoginForm from "../components/LoginForm";
import { useAdminStore } from "../store/adminStore";
import { Navigate } from "react-router";

export default function Login() {
	const { isAuthenticated } = useAdminStore();

	if (isAuthenticated) return <Navigate to="/app" replace={true} />;

	return (
		<div className="flex flex-col w-full h-full items-center justify-center gap-4 bg-slate-50">
			<AiOutlineDashboard size={80} color="#4a5b8e" />
			<h1 className="font-black text-4xl text-amber-500">Admin Dashboard</h1>
			<LoginForm />
		</div>
	);
}
