import { Toaster } from "react-hot-toast";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Login />} />
			<Route path="app" element={<MainApp />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
