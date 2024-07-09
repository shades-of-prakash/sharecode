import { Form, useActionData } from "react-router-dom";
import eyeOpen from "../assets/eye_open.svg";
import eyeClose from "../assets/eye_close.svg";
import wrong from "../assets/wrong.svg";
import tick from "../assets/tick-check.svg";
import { useState, useEffect, useCallback } from "react";
const Signup = () => {
	const formData = useActionData();
	const [showPassword, setShowPassword] = useState(false);
	const [showCond, setShowCond] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [isCheckingUser, setIsCheckingUser] = useState(false);
	const [hasStartedTyping, setHasStartedTyping] = useState(false);
	const [passwordValidations, setPasswordValidations] = useState({
		length: false,
		number: false,
		special: false,
		uppercase: false,
	});
	function handleEye(e) {
		e.preventDefault();
		setShowPassword(!showPassword);
	}
	function handlePassCond(e) {
		e.preventDefault();
		setShowCond(!showCond);
	}

	function checkPassword(pass) {
		const password = pass;
		let len = password.length >= 8;
		let num = /[0-9]/.test(password);
		let sp = /[!@#$%^&*(),.?":{}|<>]/.test(password);
		let up = /[A-Z]/.test(password);
		setPasswordValidations({
			length: len,
			number: num,
			special: sp,
			uppercase: up,
		});
	}
	const checkUser = useCallback(
		debounce(async (username) => {
			try {
				if (!username) {
					setHasStartedTyping(false);
					setIsUser(false);
					return;
				}
				setIsCheckingUser(true);
				const response = await fetch(
					"http://localhost:3000/api/auth/checkuser",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username }),
					}
				);
				const data = await response.json();
				console.log(data);
				setIsUser(data.user !== false);
			} catch (error) {
				console.log(error);
			} finally {
				setIsCheckingUser(false);
			}
		})
	);
	function debounce(cb, delay = 1000) {
		let timeOut;
		return (...args) => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				cb(...args);
			}, delay);
		};
	}
	return (
		<Form method="post" action="/signup" className="form">
			<p>Share</p>
			<h1>Welcome Back!</h1>
			<p>Reconnect and Start Chatting with Your Friends</p>
			<div className="input-field">
				<input
					type="text"
					name="username"
					onChange={(e) => {
						setHasStartedTyping(true);
						checkUser(e.target.value);
					}}
					className={
						hasStartedTyping && !isCheckingUser
							? isUser
								? "error-border"
								: "sucess-border"
							: ""
					}
					required
				/>
				<label htmlFor="username">Username</label>
				{hasStartedTyping && !isCheckingUser && (
					<img
						src={isUser ? wrong : tick}
						alt={isUser ? "User exists" : "User does not exist"}
					/>
				)}
			</div>
			{isUser && <span>The username is not available</span>}
			<div className="input-field">
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					className={formData?.message === false ? "error-border" : ""}
					onFocus={(e) => handlePassCond(e)}
					onBlur={(e) => checkPassword(e.target.value)}
					required
				/>
				<label htmlFor="password">Password</label>
				<img
					src={showPassword ? eyeClose : eyeOpen}
					alt="Toggle visibility"
					onClick={handleEye}
				/>
			</div>
			{passwordValidations && (
				<ul className="pass-cond">
					<li>
						<img src={tick}></img>password must be over 8 characters
					</li>
					<li>
						<img src={tick}></img>password must contain 1 number
					</li>
					<li>
						<img src={wrong}></img>password must contain 1 special number
					</li>
					<li>
						<img src={tick}></img>password must contain 1 uppercase
					</li>
				</ul>
			)}
			<button
				className={isUser ? "disable-submit" : "submit"}
				type="submit"
				disabled={isUser ? true : false}
			>
				Sign in
			</button>
			<p style={{ marginTop: "20px" }}>
				Do you already have an account?
				<a href="/login" style={{ marginLeft: "4px" }}>
					signin
				</a>
			</p>
		</Form>
	);
};
export default Signup;
