import { Form, useActionData } from "react-router-dom";
import eyeOpen from "../assets/eye_open.svg";
import eyeClose from "../assets/eye_close.svg";
import { useState } from "react";
export const Login = () => {
	const formData = useActionData();
	console.log(formData);
	const [showPassword, setShowPassword] = useState(false);
	function handleEye(e) {
		e.preventDefault();
		setShowPassword(!showPassword);
	}
	return (
		<Form method="post" action="/login" className="form">
			<p>Share</p>
			<h1>Welcome Back!</h1>
			<p>Reconnect and Start Chatting with Your Friends</p>
			<div className="input-field">
				<input type="text" name="username" required />
				<label htmlFor="username">Username</label>
			</div>
			<div className="input-field">
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					className={formData?.message === false ? "error-border" : ""}
					required
				/>
				<label htmlFor="password">Password</label>
				<img
					src={showPassword ? eyeClose : eyeOpen}
					alt="Toggle visibility"
					onClick={handleEye}
				/>
			</div>
			{formData?.message === "PIC" && (
				<div className="error">Entered password is incorrect!</div>
			)}
			<div className="forget">
				<a href="/forget-password">
					<label htmlFor="forget-password">Forget password?</label>
				</a>
			</div>
			{formData?.message === "UPIC" && (
				<div className="error">
					Email/password you entered email is incorrect!
				</div>
			)}
			<button className="submit" type="submit">
				Sign in
			</button>
			<p style={{ marginTop: "20px" }}>
				Don&apos;t have an account?
				<a href="/signup" style={{ marginLeft: "4px" }}>
					Create account
				</a>
			</p>
		</Form>
	);
};
