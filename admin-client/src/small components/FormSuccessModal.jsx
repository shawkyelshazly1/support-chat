import React from "react";

export default function FormSuccessModal({ results, closeModal }) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4 items-center">
				<h1 className="text-xl font-semibold text-gray-500">Username: </h1>
				<h1 className="text-xl font-medium">{results.username} </h1>
			</div>
			<div className="flex flex-row gap-4 items-center">
				<h1 className="text-xl font-semibold text-gray-500">Password: </h1>
				<h1 className="text-xl font-medium">{results.password} </h1>
			</div>
			<button
				onClick={() => {
					closeModal();
				}}
				className="text-xl font-semibold text-white bg-amber-500 w-fit py-2 px-4 rounded-lg self-center mt-3"
			>
				Close
			</button>
		</div>
	);
}
