import { AiOutlineDashboard } from "react-icons/ai";
import LoginForm from "../components/LoginForm";

export default function Login() {
	return (
		<div className="flex flex-col w-full h-full items-center justify-center gap-4 bg-slate-50">
			<AiOutlineDashboard size={80} color="#4a5b8e" />
			<h1 className="font-black text-4xl text-amber-500">Admin Dashboard</h1>
			<LoginForm />
		</div>
	);
}
