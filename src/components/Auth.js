import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [auth, setAuth] = useState("LOGIN");

  if (auth === "SIGNUP") {
    return <Signup setAuth={setAuth}/>
  } else {
    return <Login setAuth={setAuth}/>
  }
};

export default Auth;
