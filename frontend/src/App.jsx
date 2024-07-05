import "./App.css";
import { Login } from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginAuthentication } from "./actions/AuthActions";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AuthLayout from "./components/AuthLayout";
const router = createBrowserRouter([
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <Login />,
				action: LoginAuthentication,
			},
			{
				path: "signup",
				element: <Signup />,
			},
		],
	},
	{
		path: "/",
		element: <Home />,
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
