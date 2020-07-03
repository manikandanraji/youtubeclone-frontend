import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { signupUser } from "../actions";

export const StyledAuth = styled.div`
	width: 385px;
	padding: 3rem 1.5rem;
	background: ${props => props.theme.grey};
	border-radius: 4px;
	margin: 8% auto;

	h2 {
		margin-bottom: 1.3rem;
	}

	.input-group {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.input-group input:last-child {
		margin-left: 0.7rem;
	}

	input {
		border-radius: 3px;
		width: 100%;
		padding: 0.6rem 1.2rem;
		background: ${props => props.theme.darkGrey};
		border: 1px solid ${props => props.theme.darkGrey};
		margin-bottom: 1.5rem;
		color: ${props => props.theme.primaryColor};
	}

	.action {
		margin-top: 1rem;
	}

	button {
		padding: 0.4rem 1rem;
		background: ${props => props.theme.red};
		color: ${props => props.theme.white};
		border: 1px solid ${props => props.theme.red};
		border-radius: 3px;
		text-transform: uppercase;
		letter-spacing: 1.1px;
	}

	span {
		letter-spacing: 0.8px;
		color: ${props => props.theme.secondaryColor};
	}

	@media screen and (max-width: 430px) {
		margin: 20% auto;
		width: 90%;
	}
`;

const Signup = ({ login, signupUser }) => {
	const firstname = useInput("Redux");
	const lastname = useInput("Thunk");
	const username = useInput("reduxthunk");
	const email = useInput("reduxthunk@gmail.com");
	const password1 = useInput("123456");
	const password2 = useInput("123456");

	const handleSubmit = e => {
		e.preventDefault();

		const payload = {
			username: username.value,
			firstname: firstname.value,
			lastname: lastname.value,
			email: email.value,
			password: password1.value
		};

		signupUser(payload);
	};

	return (
		<StyledAuth>
			<h2>Create your account</h2>
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						placeholder="firstname"
						value={firstname.value}
						onChange={firstname.onChange}
					/>
					<input
						type="text"
						placeholder="lastname"
						value={lastname.value}
						onChange={lastname.onChange}
					/>
				</div>
				<input
					type="text"
					placeholder="username"
					value={username.value}
					onChange={username.onChange}
				/>
				<input
					type="email"
					placeholder="email"
					value={email.value}
					onChange={email.onChange}
				/>
				<div className="input-group">
					<input
						type="password"
						placeholder="password"
						value={password1.value}
						onChange={password1.onChange}
					/>
					<input
						type="password"
						placeholder="confirm"
						value={password2.value}
						onChange={password2.onChange}
					/>
				</div>
				<div className="action input-group">
					<span className="pointer" onClick={() => login()}>
						Signin instead
					</span>
					<button>Sign Up</button>
				</div>
			</form>
		</StyledAuth>
	);
};

export default connect(null, { signupUser })(Signup);
