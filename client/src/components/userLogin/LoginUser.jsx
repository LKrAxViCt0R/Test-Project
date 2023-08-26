import React, { useContext, useState } from "react";
import "./loginUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContextt from "../../store/AuthContextt";

export const LoginUser = () => {
  const navigate = useNavigate();

  const AuthCtx = useContext(AuthContextt);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const emailHandler = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        email: event.target.value,
      };
    });
  };

  const passwordHandler = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        password: event.target.value,
      };
    });
  };

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("http://localhost:4000/user/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      AuthCtx.setisLoggedIn(true);
      localStorage.setItem("user", res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/user/expense/");
      console.log(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="form-container">
      <h1>User Login</h1>
      <form onSubmit={loginHandler}>
        <div className="form-input">
          <input type="type" placeholder="Email" onChange={emailHandler} />
        </div>
        <div className="form-input">
          <input
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
          />
        </div>
        <div className="form-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
