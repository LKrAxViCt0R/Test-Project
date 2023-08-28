import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const defaultTheme = createTheme();

export default function LoginAdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/expense");
    }
  }, []);

  const [admin, setAdmin] = React.useState({
    email: "",
    password: "",
  });

  const emailHandler = (event) => {
    setAdmin((prevState) => {
      return {
        ...prevState,
        email: event.target.value,
      };
    });
  };

  const passwordHandler = (event) => {
    setAdmin((prevState) => {
      return {
        ...prevState,
        password: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("http://localhost:4000/admin/login", admin, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res",res)
      if (res.status===200) {
        localStorage.setItem("user", res.data.admin.admin_id);
        console.log("setuser");
        localStorage.setItem("token", res.data.token);
        navigate("/admin/expense/");
        console.log(res.data.message);
      }
      else{
        console.log("error in else");
      }
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
            Admin Login
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
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
