import Login from "./pages/Login";
import MainApp from "./pages/MainApp";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

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
