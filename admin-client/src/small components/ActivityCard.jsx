/* eslint-disable react/prop-types */
export default function ActivityCard({ type, value }) {
	return (
		<div className="flex flex-col gap-6 items-center justify-center">
			<h1 className="text-xl font-normal text-[#97A4B7]">{type}</h1>
			<h1 className="text-6xl  font-semibold">{value}</h1>
		</div>
	);
}
