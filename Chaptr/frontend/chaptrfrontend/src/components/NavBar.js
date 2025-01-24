import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../styles/ThemeColors";
import { useState } from "react";

export default function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const Logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tbrList");
    sessionStorage.removeItem("clubId");
    navigate("/Chaptr");
  };

  return (
    <div>
      <nav className="desktop-nav">
        <div
          style={{
            backgroundColor: darkMode ? colors.black : colors.whitesmoke,
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* Desktop Navigation Buttons */}
          <div className="nav-links">
            <Button
              variant="contained"
              component={Link}
              sx={{
                marginRight: 2,
                backgroundColor: colors.blue,
              }}
              to="/Chaptr"
            >
              Chaptr
            </Button>

            <Button
              variant="contained"
              component={Link}
              sx={{
                marginRight: 2,
                backgroundColor: colors.blue,
              }}
              to="/Profile"
            >
              Profile
            </Button>

            <Button
              variant="contained"
              component={Link}
              sx={{
                marginRight: 2,
                backgroundColor: colors.blue,
              }}
              to="/ClubsList"
            >
              Clubs
            </Button>

            <Button
              variant="contained"
              color={darkMode ? "secondary" : "primary"}
              onClick={toggleDarkMode}
              sx={{ marginRight: 2, backgroundColor: colors.blue }}
            >
              Dark Mode
            </Button>

            <Button
              variant="contained"
              onClick={Logout}
              sx={{
                marginRight: 2,
                backgroundColor: colors.blue,
              }}
            >
              Logout
            </Button>
          </div>

          {/* Hamburger Icon */}
          <div
            className={`hamburger-icon ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu */}
      <nav className={`hamburger-menu ${menuOpen ? "open" : ""}`}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Button
              component={Link}
              to="/Chaptr"
              onClick={toggleMenu}
              sx={{ width: "100%", textAlign: "center" }}
            >
              Chaptr
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/Profile"
              onClick={toggleMenu}
              sx={{ width: "100%", textAlign: "center" }}
            >
              Profile
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/ClubsList"
              onClick={toggleMenu}
              sx={{ width: "100%", textAlign: "center" }}
            >
              Clubs
            </Button>
          </li>
          <li>
            <Button
              onClick={toggleDarkMode}
              sx={{ width: "100%", textAlign: "center" }}
            >
              Dark Mode
            </Button>
          </li>
          <li>
            <Button
              onClick={Logout}
              sx={{ width: "100%", textAlign: "center" }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
   

    </div>
  );
}
