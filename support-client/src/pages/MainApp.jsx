import { ThreeDots } from "react-loader-spinner";
import { useSupportStore } from "../store/supportStore";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import ConversationsPage from "./ConversationsPage";

export default function MainApp() {
	const { isAuthenticated, isLoading } = useSupportStore();

	return isLoading ? (
		<div className="w-full h-full flex items-center justify-center">
			<ThreeDots
				height="120"
				width="120"
				radius="9"
				color="#F59E0B"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClassName=""
				visible={true}
			/>
		</div>
	) : (
		<>
			{!isAuthenticated ? (
				<Navigate to="/" replace={true} />
			) : (
				<div className="w-full h-screen flex flex-col-reverse ">
					<ConversationsPage />
					<Navbar />
				</div>
			)}
		</>
	);
}
