import { useEffect } from "react";
import AgentCard from "../small components/AgentCard";
import { socket } from "../socket/socket";
import { useAdminStore } from "../store/adminStore";

export default function AgentSection() {
	const { isAuthenticated, setAgentsData, agentsData } = useAdminStore();

	useEffect(() => {
		let updatesInterval = undefined;

		if (isAuthenticated) {
			updatesInterval = setInterval(() => {
				socket.emit("admin:agents-updates");
				if (!isAuthenticated) {
					clearInterval(updatesInterval);
				}
			}, 10000);
		}

		socket.on("admin:agents-updates", (data) => {
			setAgentsData(data);
		});

		return () => {
			socket.off("admin:agents-updates");
			clearInterval(updatesInterval);
		};
	}, [isAuthenticated]);

	return (
		<div className="flex flex-col bg-white rounded-2xl flex-1 mb-6">
			<h1 className="w-full border-b-[1px] text-xl font-semibold px-4 py-3">
				Agents
			</h1>
			<div className=" px-4 py-3 grid grid-flow-row grid-cols-7 gap-2 overflow-y-scroll h-[415px]">
				{agentsData.map((agent) => (
					<AgentCard agentData={agent} key={agent.socketId} />
				))}
			</div>
		</div>
	);
}
