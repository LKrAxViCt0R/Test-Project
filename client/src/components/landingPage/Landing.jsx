import React, { useContext, useEffect, useState } from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import {
  Box,
  Container,
  Fade,
  Grid,
  Grow,
  Slide,
  Typography,
} from "@mui/material";
import money from "../../images/manwithmoney.svg";
import { RoleSelector } from "../roleSelector/RoleSelector";
import { UserExpense } from "../userExpense/UserExpense";

export const Landing = () => {
  const [inProp, setInProp] = useState(false);
  const [roleProp, setRoleProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <UserExpense />
      ) : (
        <div className="container">
          <div className="content-container">
            <Grid container spacing={2} className="grid-container">
              <Grid item xs={6}>
                <Container sx={{ marginLeft: "25px" }}>
                  <Slide in={inProp} direction="right" timeout={2000}>
                    <Typography variant="h1">
                      Efficient Money Tracking & Management
                    </Typography>
                  </Slide>
                  <Slide in={inProp} direction="right" timeout={3000}>
                    <Typography variant="h6" sx={{ color: "grey" }}>
                      <p>
                        Effortless Financial Insight: Take Control with Our
                        Expense Tracking App
                      </p>
                    </Typography>
                  </Slide>
                </Container>
              </Grid>

              <Grid item xs={6}>
                <Grow in={inProp} timeout={2000}>
                  <Box className="img-box">
                    <img src={money} alt="money_man" className="img-landing" />
                  </Box>
                </Grow>
              </Grid>
            </Grid>
          </div>
          <div className="userOption-container">
              <RoleSelector />
          </div>
        </div>
      )}
    </>
  );
};
