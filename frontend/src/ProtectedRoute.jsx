import React from "react";
import { Navigate } from "react-router-dom";
export const isAuthenticated = () => {
	return localStorage.getItem("authToken") !== null;
};
export const ProtectedRoute = ({ children }) => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" />;
	}
	return children;
};
