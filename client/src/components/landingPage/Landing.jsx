import React, { useContext, useEffect } from "react";
import "./landing.css";
import AuthContextt from "../../store/AuthContextt";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const AuthCtx = useContext(AuthContextt);
  const navigate = useNavigate();

  useEffect(() => {}, [AuthCtx.isLoggedIn]);

  const onLogoutHandler = () => {
    AuthCtx.setisLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <li>
        {!localStorage.getItem("token") ? (
          <button onClick={() => navigate("/login")}>Login</button>
        ) : (
          <a onClick={onLogoutHandler}>Logout</a>
        )}
      </li>
    </div>
  );
};
