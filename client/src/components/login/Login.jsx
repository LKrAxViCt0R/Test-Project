import React from "react";
import "./login.css";
import { AdminLogin } from "../admin/adminLogin/AdminLogin";
import { LoginUser } from "../userLogin/LoginUser";

export const Login = () => {
  return (
    <div className="container">
      <div className="item">
        <LoginUser />
      </div>
      <div className="item">
        <AdminLogin />
      </div>
    </div>
  );
};
