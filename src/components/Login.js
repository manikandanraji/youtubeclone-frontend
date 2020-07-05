import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import useInput from "../hooks/useInput";
import { loginUser } from "../actions";
import { StyledAuth } from "./Signup";

const Login = ({ signup, loginUser }) => {
	const email = useInput("");
	const password = useInput("");

	const handleLogin = e => {
		e.preventDefault();

		if (!email.value || !password.value) {
			return toast.error("Please fill in all the fields");
		}

		const payload = {
			email: email.value,
			password: password.value
		};

		const clearForm = () => {
			email.setValue("");
			password.setValue("");
		};

		loginUser(payload, clearForm);
	};

	return (
		<StyledAuth>
			<h2>Login to your account</h2>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="email"
					value={email.value}
					onChange={email.onChange}
				/>
				<input
					type="password"
					placeholder="password"
					value={password.value}
					onChange={password.onChange}
				/>
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
