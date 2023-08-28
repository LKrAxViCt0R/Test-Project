import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Slide } from "@mui/material";

export default function NavBar() {
  const [setProp, setInProp] = React.useState(false);

  React.useEffect(() => {
    setInProp(true);
  }, []);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide in={setProp} timeout={1000}>
        <AppBar position="static" sx={{ backgroundColor: "#57ba86" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                flexGrow: 1,
                color: "black",
              }}
            >
              MONEYTRACK
            </Typography>
            {token ? (
              <Button sx={{ color: "black" }} onClick={logoutHandler}>
                Logout
              </Button>
            ) : (
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
}
