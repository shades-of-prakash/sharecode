import "./App.css";
import { Login } from "./components/Login";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { LoginAuthentication } from "./actions/AuthActions";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AuthLayout from "./components/AuthLayout";
import { ProtectedRoute, isAuthenticated } from "./ProtectedRoute";

const getAuthElement = (unauthenticatedElement, authenticatedElement) => {
	return isAuthenticated() ? authenticatedElement : unauthenticatedElement;
};
const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: getAuthElement(
					<Navigate to="/login" />,
					<Navigate to="/home" />
				),
			},
			{
				path: "login",
				element: getAuthElement(<Login />, <Navigate to="/home" />),
				action: LoginAuthentication,
			},
			{
				path: "signup",
				element: getAuthElement(<Signup />, <Navigate to="/home" />),
			},
		],
	},
	{
		path: "/home",
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
