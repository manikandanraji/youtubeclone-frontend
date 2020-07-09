import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [auth, setAuth] = useState("LOGIN");

  const login = () => setAuth("LOGIN");
  const signup = () => setAuth("SIGNUP");

  if (auth === "SIGNUP") {
    return <Signup login={login} />;
  } else {
    return <Login signup={signup} />;
  }
};

export default Auth;
