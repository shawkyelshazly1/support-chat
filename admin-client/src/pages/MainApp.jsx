import ActiveWindow from "../components/ActiveWindow";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import { useAdminStore } from "../store/adminStore";
import { Navigate } from "react-router";
import { ThreeDots } from "react-loader-spinner";

export default function MainApp() {
	const { isAuthenticated, isLoading } = useAdminStore();

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
				<div className="flex flex-row w-full h-full">
					<Sidemenu />
					<div className="flex flex-1 flex-col w-full h-full bg-[#F0F3F8] rounded-l-[50px] px-6 pt-6">
						<Navbar />
						<ActiveWindow />
					</div>
				</div>
			)}
		</>
	);
}
