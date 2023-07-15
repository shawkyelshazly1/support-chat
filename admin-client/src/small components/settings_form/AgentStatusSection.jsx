import { RiDeleteBin6Line } from "react-icons/ri";
import AgentStatusModal from "../AgentStatusModal";
import EditStatusModal from "../EditStatusModal";
import _ from "lodash";

export default function AgentStatusSection({
	settingsFormData,
	setSettingsFormData,
}) {
	return (
		<div className="flex flex-row gap-4 w-full ">
			<h1 className="text-lg font-semibold">User Status:</h1>
			<div className="grid  grid-cols-1    xl:grid-cols-2 grid-flow-row  xl:gap-x-20 gap-y-4 flex-1 justify-between ">
				{settingsFormData.agentStatus.map((status, idx) => (
					<div className="flex flex-row justify-between items-center" key={idx}>
						<span
							style={{ backgroundColor: status.color }}
							className={`py-1 px-2 rounded-lg  text-white text-lg font-semibold max-w-fit min-w-[70px] text-center`}
						>
							{status.name}
						</span>
						{status.name === "online" ? (
							<p className="font-black text-lg text-green-400">Default</p>
						) : (
							<div className="flex flex-row gap-2">
								<EditStatusModal
									selectedStatus={status}
									settingsFormData={settingsFormData}
									setSettingsFormData={setSettingsFormData}
								/>
								<RiDeleteBin6Line
									onClick={() => {
										setSettingsFormData({
											...settingsFormData,
											agentStatus: _.filter(
												settingsFormData.agentStatus,
												(element) => !_.isEqual(element, status)
											),
										});
									}}
									size={20}
									className="hover:text-red-500 cursor-pointer"
								/>
							</div>
						)}
					</div>
				))}
				<AgentStatusModal
					settingsFormData={settingsFormData}
					setSettingsFormData={setSettingsFormData}
				/>
			</div>
		</div>
	);
}
