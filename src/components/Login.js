import React from "react";
import { connect } from "react-redux";
import useInput from "../hooks/useInput";
import { loginUser } from "../actions";
import { StyledAuth } from "./Signup";

const Login = ({ signup, loginUser }) => {
	const email = useInput("manikandan@gmail.com");
	const password = useInput("123456");

	const handleLogin = e => {
		e.preventDefault();

		const payload = {
			email: email.value
		};

		loginUser(payload);
	};

	return (
		<StyledAuth>
			<h2>Login to your account</h2>
			<form onSubmit={handleLogin}>
				<input type="email" placeholder="email" value={email.value} onChange={email.onChange}/>
				<input type="password" placeholder="password" value={password.value} onChange={password.onChange}/>
				<div className="action input-group">
					<span className="pointer" onClick={() => signup()}>
						Signup instead
					</span>
					<button>Login</button>
				</div>
			</form>
		</StyledAuth>
	);
};

export default connect(null, { loginUser })(Login);
