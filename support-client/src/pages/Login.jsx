import { Navigate } from "react-router";
import { useSupportStore } from "../store/supportStore";
import LoginForm from "../components/LoginForm";

export default function Login() {
	const { isAuthenticated } = useSupportStore();

	if (isAuthenticated) return <Navigate to="/app" replace={true} />;

	return (
		<div className="w-full h-full flex items-center justify-center">
			<LoginForm />
		</div>
	);
}
