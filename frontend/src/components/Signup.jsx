import { Form, useActionData } from "react-router-dom";
import eyeOpen from "../assets/eye_open.svg";
import eyeClose from "../assets/eye_close.svg";
import { useState } from "react";
const Signup = () => {
	const errorData = useActionData();
	const [showPassword, setShowPassword] = useState(false);
	const [showDetails, setShowDetails] = useState(false);

	function handleEye(e) {
		e.preventDefault();
		setShowPassword(!showPassword);
	}

	return (
		<Form method="post" action="/auth/signup" className="form">
			<p>Share</p>
			<h1>Welcome Back!</h1>
			<p>Reconnect and Start Chatting with Your Friends</p>
			<div className="input-field">
				<label htmlFor="email">Username</label>
				<input
					type="text"
					placeholder="johndoe@gmail.com"
					name="email"
					className={
						errorData && (errorData.code === "eic" || errorData.code === "epic")
							? "error-border"
							: ""
					}
					required
				/>
			</div>
			{errorData && (errorData.code === "eic" || errorData.code === "epic") && (
				<div className="error">{errorData?.error || errorData?.emaiError}</div>
			)}
			<div className="input-field">
				<label htmlFor="password">Password</label>
				<input
					type={showPassword ? "text" : "password"}
					placeholder="Johndoe@344"
					name="password"
					onFocus={() => setShowDetails(true)}
					className={
						errorData && (errorData.code === "pic" || errorData.code === "epic")
							? "error-border"
							: ""
					}
					required
				/>
				<button onClick={handleEye} type="button">
					<img
						src={showPassword ? eyeClose : eyeOpen}
						alt="Toggle visibility"
					/>
				</button>
			</div>
			{errorData && (errorData.code === "pic" || errorData.code === "epic") && (
				<div className="error">{errorData?.error || errorData?.passError}</div>
			)}
			{showDetails && <div className="pass_cons"></div>}
			<div className="flex-space forget">
				<label htmlFor="remember" className="flex-space" style={{ gap: "4px" }}>
					<input type="checkbox" id="remember" />
					Remember me
				</label>
				<a href="/forget-password">
					<label htmlFor="forget-password">Forget password?</label>
				</a>
			</div>
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

export default Signup;
