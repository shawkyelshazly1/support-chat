import { useAppStore } from "../store/appStore";
import ConversationsDashboard from "../pages/ConversationsDashboard";
import RealtimeDashboard from "../pages/RealtimeDashboard";
import Settings from "../pages/Settings";

export default function ActiveWindow() {
	const { activeWindow } = useAppStore();
	return (
		<div className="w-full flex-1 flex mt-6">
			{activeWindow === "dashboard" ? (
				<RealtimeDashboard />
			) : (
				<>
					{activeWindow === "conversations" ? (
						<ConversationsDashboard />
					) : (
						<Settings />
					)}
				</>
			)}
		</div>
	);
}
