import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { StyledAuth } from "./Signup";
import useInput from "../hooks/useInput";
import { login } from "../reducers/user";

const Login = ({ signup, loginUser }) => {
  const dispatch = useDispatch();

  const email = useInput("");
  const password = useInput("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.value.trim() || !password.value.trim()) {
      return toast.error("Please fill in all the fields");
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    const clearForm = () => {
      email.setValue("");
      password.setValue("");
    };

    dispatch(login({ payload, clearForm }));
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

export default Login;
