import { useEffect } from "react";
import SkillsTable from "./SkillsTable";
import { socket } from "../socket/socket";
import { useAdminStore } from "../store/adminStore";

export default function QueueSummary() {
	const { isAuthenticated, queueSummary, setQueueSummaryData } =
		useAdminStore();
	useEffect(() => {
		let updatesInterval = undefined;

		if (isAuthenticated) {
			updatesInterval = setInterval(() => {
				socket.emit("admin:queue-updates");
				if (!isAuthenticated) {
					clearInterval(updatesInterval);
				}
			}, 10000);
		}

		socket.on("admin:queue-updates", (data) => {
			setQueueSummaryData(data);
		});

		return () => {
			socket.off("admin:queue-updates");
			clearInterval(updatesInterval);
		};
	}, [isAuthenticated]);

	return (
		<div className="flex flex-col bg-white rounded-2xl">
			<h1 className="w-full border-b-[1px] text-xl font-semibold px-4 py-3">
				Queue summary
			</h1>
			<div className="flex flex-row px-4 h-full w-full gap-4">
				<div className="flex flex-col items-center justify-center gap-3 px-3">
					<h1 className="font-semibold text-6xl">
						{queueSummary.totalInQueue}
					</h1>
					<hr className="border-2 w-2/5" />
					<h1>
						<span className="font-semibold">{queueSummary.totalOverdue}</span>{" "}
						OVERDUE
					</h1>
				</div>
				<SkillsTable />
			</div>
		</div>
	);
}
