import { redirect } from "react-router-dom";

export const LoginAuthentication = async ({ request }) => {
	const loginDetails = await request.formData();
	const submited = {
		username: loginDetails.get("username"),
		password: loginDetails.get("password"),
	};
	const { username, password } = submited;
	const loginData = await fetch("http://localhost:3000/api/auth/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});
	const data = await loginData.json();
	if (!data.accessToken) {
		return {
			message: data.password === false ? "PIC" : "UPIC",
		};
	}
	localStorage.setItem("authToken", data.accessToken);
	return redirect("/home");
};
