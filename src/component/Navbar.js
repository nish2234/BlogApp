import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { doLogOut, getCurrentUser, isLoggedIn } from "./auth";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);

  const handleLogout = () => {
    setAnchorElNav(null);
    doLogOut(() => {
      toast.success("Logged out successfully");
      setLogin(false);

      navigate("/login");
    });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1D2228" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MYBLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/" className="link">
                    Home
                  </Link>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/about" className="link">
                    About
                  </Link>
                </Typography>
              </MenuItem>
              {login && (
                <Stack>
                  <MenuItem >
                    <Typography textAlign="center">
                      <Link to="/user/profile" className="link">
                        Profile
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link to="/user/dashboard" className="link">
                        {user.username}
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">
                      <Link to="/login" className="link">
                        Logout
                      </Link>
                    </Typography>
                  </MenuItem>
                </Stack>
              )}
              {!login && (
                <Stack>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/login" className="link">
                        Login
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/signup" className="link">
                        Signup
                      </Link>
                    </Typography>
                  </MenuItem>
                </Stack>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MYBLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/" className="link2">
                Home
              </Link>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/about" className="link2">
                About
              </Link>
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {login && (
              <>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link to={"/user/profile"} className="link2">
                    Profile
                  </Link>
                </Button>

                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link to="/user/dashboard" className="link2">
                    {user.username}
                  </Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="link2">Logout</Link>
                </Button>
              </>
            )}

            {!login && (
              <>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link to="/login" className="link2">
                    Login
                  </Link>
                </Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link to="/signup" className="link2">
                    Signup
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
