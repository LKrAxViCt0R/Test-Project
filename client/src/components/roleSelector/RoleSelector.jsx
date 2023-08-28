import React from "react";
import user from "../../images/user.svg";
import admin from "../../images/admin.jpg";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./roleSelector.css";

export const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" className="role-container">
      <hr />
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Choose Your Role
      </Typography>
      <hr />
      <div className="option-container">
        <div
          className="option"
          onClick={() => {
            navigate("/login/user");
          }}
        >
          <Typography variant="h5" sx={{ marginTop: "30px" }}>
            USER
          </Typography>
          <img src={user} alt="user_img" />
        </div>
        <div
          className="option"
          onClick={() => {
            navigate("/login/admin");
          }}
        >
          <Typography variant="h5" sx={{ marginTop: "30px" }}>
            ADMIN
          </Typography>
          <img src={admin} alt="admin_img" className="admin-img" />
        </div>
      </div>
    </Container>
  );
};
