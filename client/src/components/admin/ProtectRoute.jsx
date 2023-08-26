import React, { useContext } from "react";
import AuthContextt from "../../store/AuthContextt";
import { Outlet } from "react-router-dom";
import { Login } from "../login/Login";

export const ProtectRoute = () => {
  const AuthCtx = useContext(AuthContextt);
  return AuthCtx.isLoggedIn ? <Outlet /> : <Login />;
};
