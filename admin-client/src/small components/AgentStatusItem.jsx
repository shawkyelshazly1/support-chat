export default function AgentStatusItem({ type, value }) {
	return (
		<div className="flex flex-row justify-between gap-6 text-sm">
			<h1 className="font-medium text-gray-400 ">{type}</h1>
			<h1 className="text-gray-600">{value}</h1>
		</div>
	);
}
