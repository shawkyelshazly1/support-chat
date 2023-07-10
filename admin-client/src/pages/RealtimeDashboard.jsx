import AgentSection from "../components/AgentSection";
import ActivitySummary from "../small components/ActivitySummary";
import QueueSummary from "../small components/QueueSummary";

export default function RealtimeDashboard() {
	return (
		<div className="w-full h-full flex flex-col gap-6">
			<div className="flex flex-row gap-6 h-[310px]">
				<QueueSummary />
				<ActivitySummary />
			</div>
			<AgentSection />
		</div>
	);
}
