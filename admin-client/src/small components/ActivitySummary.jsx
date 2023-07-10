import { useAdminStore } from "../store/adminStore";
import ActivityCard from "./ActivityCard";
import _ from "lodash";

export default function ActivitySummary() {
	const { agentsData } = useAdminStore();
	console.log();
	console.log(agentsData.length * 4);
	return (
		<div className="flex flex-col bg-white rounded-2xl flex-1">
			<h1 className="w-full border-b-[1px] text-xl font-semibold px-4 py-3">
				Activity summary
			</h1>
			<div className="flex w-full items-center justify-evenly h-full">
				<ActivityCard
					type={"ASSIGNED"}
					value={_.sumBy(agentsData, (agent) => agent.active + agent.closed)}
				/>
				<hr className="border-[1px] h-full" />
				<ActivityCard
					type={"LOAD"}
					value={`${
						Math.round(
							(_.sumBy(agentsData, (agent) => agent.active) /
								(agentsData.length * 4)) *
								100
						) || 0
					}%`}
				/>
				<hr className="border-[1px] h-full" />
				<ActivityCard
					type={"CLOSED"}
					value={_.sumBy(agentsData, (agent) => agent.closed)}
				/>
				<hr className="border-[1px] h-full" />
				<ActivityCard type={"CSAT"} value={"67%"} />
			</div>
		</div>
	);
}
