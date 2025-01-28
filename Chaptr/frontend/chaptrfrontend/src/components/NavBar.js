import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../styles/ThemeColors";
import { useState, useEffect } from "react";

export default function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect (() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
  

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [menuOpen]);

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
            width: "100vw",
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem"
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
            <span style={{ backgroundColor: darkMode? colors.whitesmoke : colors.black }}></span>
            <span style={{ backgroundColor: darkMode? colors.whitesmoke : colors.black }}></span>
            <span style={{ backgroundColor: darkMode? colors.whitesmoke : colors.black }}></span>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu */}
      <nav className={`hamburger-menu ${menuOpen ? "open" : ""}`} >
        <ul style={{ 
                    listStyleType: "none", 
                    padding: "1rem",
                    textAlign: "right",
                    backgroundColor: darkMode ? colors.black : colors.whitesmoke,
                    }}>
          <li>
            <Button
              component={Link}
              to="/Chaptr"
              onClick={toggleMenu}
              sx={{
                color: darkMode? colors.pink : colors.purple,
              }}
            >
              Chaptr
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/Profile"
              onClick={toggleMenu}
              sx={{
                color: darkMode? colors.pink : colors.purple,
              }}
            >
              Profile
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/ClubsList"
              onClick={toggleMenu}
              sx={{
                color: darkMode? colors.pink : colors.purple,
              }}
            >
              Clubs
            </Button>
          </li>
          <li>
            <Button
              onClick={toggleDarkMode}
              sx={{
                color: darkMode? colors.pink : colors.purple,
              }}
            >
              Dark Mode
            </Button>
          </li>
          <li>
            <Button
              onClick={Logout}
              sx={{
                color: darkMode? colors.pink : colors.purple,
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
   

    </div>
  );
}
