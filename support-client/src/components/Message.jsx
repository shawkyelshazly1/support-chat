/* eslint-disable react/prop-types */

import dayjs from "dayjs";

export default function Message({ message }) {
	return (
		<>
			<div
				className={`flex flex-col gap-1 ${
					message.type === "customer" ? "" : "items-end"
				}`}
			>
				<p
					className={` py-2 px-4 text-lg break-words w-fit max-w-[75%] ${
						message.type === "customer"
							? "bg-[#8A3BA2] rounded-r-3xl rounded-tl-3xl text-white"
							: "bg-[#3F5B92] text-white rounded-l-3xl rounded-tr-3xl"
					}`}
				>
					{message.content}
				</p>
				<span className="text-xs text-slate-400 font-thin ml-4">
					{dayjs(Date(message.timeStamp)).format("HH:mm A")}
				</span>
			</div>
		</>
	);
}
