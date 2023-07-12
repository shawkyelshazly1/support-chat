export default function NavbarStats() {
	return (
		<div className="mr-auto hidden xl:flex lg:flex flex-row justify-evenly flex-1  ">
			<div className="flex flex-col justify-between items-center  xl:px-4 lg:px-4">
				<h1 className="font-medium ">OPEN</h1>
				<p className=" text-2xl">{0}</p>
			</div>
			<hr className="border-[1px]  h-full" />
			<div className="flex flex-col justify-between items-center  xl:px-4 lg:px-4">
				<h1 className="font-medium text-lg">OVERDUE</h1>
				<p className=" text-2xl">{0}</p>
			</div>
			<hr className="border-[1px]  h-full" />
			<div className="flex flex-col justify-between items-center  xl:px-4 lg:px-4 ">
				<h1 className="font-medium text-lg">SOON TO BE OVERDUE</h1>
				<p className=" text-2xl">15</p>
			</div>
			<hr className="border-[1px]  h-full" />
			<div className="flex flex-col justify-between items-center   xl:px-4 lg:px-4">
				<h1 className="font-medium text-lg">CSAT</h1>
				<p className=" text-2xl">57%</p>
			</div>
		</div>
	);
}
