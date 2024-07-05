import { redirect } from "react-router-dom";

export const LoginAuthentication = async ({ request }) => {
	const loginDetails = await request.formData();
	console.log(loginDetails);
	const submited = {
		email: loginDetails.get("email"),
		password: loginDetails.get("password"),
	};
	const { email, password } = submited;
	const loginData = await fetch("http://localhost:3000/api/auth/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await loginData.json();
	if (data.message == "password-is-correct") {
		return redirect("/");
	} else {
		if (data.message == "password-is-incorrect") {
			return { error: "Password you entered is incorrect", code: "pic" };
		} else if (data.message == "email-is-not-found") {
			return { error: "Email you entered is not valid", code: "eic" };
		} else {
			return {
				passError: "Password you entered is incorrect",
				emaiError: "Email you entered is not valid",
				code: "epic",
			};
		}
	}
};
