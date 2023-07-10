import { DataGrid } from "@mui/x-data-grid";
import { useAdminStore } from "../store/adminStore";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function SkillsTable() {
	const { queueSummary } = useAdminStore();
	const columns = [
		{ field: "skill", headerName: "SKILL", width: 150 },
		{ field: "inQueue", headerName: "INQUEUE", width: 90 },
		{ field: "maxWaitTime", headerName: "MAX. WAIT TIME", width: 160 },
	];

	let rows = [];
	if (Object.keys(queueSummary).length > 0) {
		rows = queueSummary.skills?.map((skill, idx) => {
			let duration = `${Math.floor(
				dayjs.duration(parseInt(skill.maxWaitTime * 1000)).minutes()
			)}m : ${Math.floor(
				dayjs.duration(parseInt(skill.maxWaitTime * 1000)).seconds()
			)}s`;

			delete skill.customers;
			return { id: idx, ...skill, maxWaitTime: duration };
		});
	}
	return (
		<div className=" h-[260px] pb-4 flex-1">
			<DataGrid
				rows={rows}
				columns={columns}
				hideFooter
				style={{ border: "0px", borderLeft: "1px solid #E0E0E0" }}
			/>
		</div>
	);
}
