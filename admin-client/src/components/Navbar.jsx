export default function Navbar() {
	return (
		<div className="flex flex-row justify-between h-[75px] px-4 items-center bg-white rounded-2xl">
			<h1 className="text-2xl font-black ">Admin Dashboard</h1>

			<img
				src="https://res.cloudinary.com/dwufx31ox/image/upload/v1688998393/download_1_jqq2ei.png"
				className=" object-cover border-2 border-amber-500  aspect-square  w-12 rounded-full cursor-pointer"
			/>
		</div>
	);
}
