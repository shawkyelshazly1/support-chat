import SettingsForm from "../components/SettingsForm";
import AddAgentModal from "../small components/AddAgentModal";
import AddManagerModal from "../small components/AddManagerModal";
import ApiKeySection from "../small components/ApiKeySection";

export default function Settings() {
	return (
		<div className="w-full h-full flex flex-col gap-4 px-4">
			<div className="flex flex-row justify-between w-full">
				<h1 className="text-3xl font-black">Settings</h1>
				<div className="flex flex-row gap-4">
					<AddAgentModal />
					<AddManagerModal />
				</div>
			</div>
			<ApiKeySection />
			<SettingsForm />
		</div>
	);
}
