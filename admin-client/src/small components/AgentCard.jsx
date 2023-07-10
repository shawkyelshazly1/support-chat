/* eslint-disable react/prop-types */
import AgentStatusItem from "./AgentStatusItem";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export default function AgentCard({ agentData }) {
	return (
		<div className="flex flex-col w-fit  items-center ">
			<h1 className="translate-y-6  w-11 h-11 flex items-center justify-center rounded-full bg-[#97A4B7] text-white text-2xl">
				{agentData.username[0]}
			</h1>
			<div className="flex flex-col items-center pb-2 pt-7 px-4 border-[2px] rounded-xl gap-1">
				<div className="flex flex-row gap-2 items-center">
					<span
						className={`w-3 h-3 rounded-full ${
							agentData.status === "offline" ? "bg-red-600" : "bg-green-600"
						}  `}
					></span>
					<h1 className="font-medium">{agentData.username}</h1>
				</div>
				<p className="text-sm">({agentData.status})</p>
				<div className="flex flex-col gap-1 py-2">
					<AgentStatusItem
						type="Assigned"
						value={agentData.active + agentData.closed}
					/>
					<AgentStatusItem type="Active" value={agentData.active} />
					<AgentStatusItem type="Closed" value={agentData.closed} />
					<AgentStatusItem
						type="State duration"
						value={`${Math.floor(
							dayjs
								.duration(parseInt(Date.now() - agentData.stateStart))
								.minutes()
						)}m : ${Math.floor(
							dayjs
								.duration(parseInt(Date.now() - agentData.stateStart))
								.seconds()
						)}s`}
					/>
					<AgentStatusItem type="CSAT" value="75%" />
				</div>
			</div>
		</div>
	);
}
