import { Outlet } from "react-router-dom";
import login2 from "../assets/login-3.jpg";

const AuthLayout = () => {
	return (
		<div className="form-main flex">
			<div className="wrapper flex">
				<div className="form-image flex">
					<img src={login2} alt="Auth" />
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
