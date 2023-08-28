import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function RegisterUser() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/expense");
    }
  }, []);
  const [user, setUser] = React.useState({
    full_name: "",
    email: "",
    password: "",
  });

  const fullnameHandler = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        full_name: event.target.value,
      };
    });
  };

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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("http://localhost:4000/user/add", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("user", res.data.user.user_id);
      localStorage.setItem("token", res.data.token);
      navigate("/login/user/");
      console.log(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="full_name"
              label="Full Name"
              name="fullname"
              autoComplete="name"
              autoFocus
              onChange={fullnameHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
