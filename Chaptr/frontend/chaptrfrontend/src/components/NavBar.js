import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tbrList");
    sessionStorage.removeItem("clubId");
    sessionStorage.removeItem("favoritesList");
    navigate("/Chaptr");
  };

  return (
    <div>
      <nav>
        <div
          style={{
            backgroundColor: darkMode ? "#121212" : "#f5f5f5",
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            component={Link}
            sx={{
              marginRight: 2,
              backgroundColor: "#92B9BD",
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
              backgroundColor: "#92B9BD",
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
              backgroundColor: "#92B9BD",
            }}
            to="/ClubsList"
          >
            Clubs
          </Button>

          <Button
            variant="contained"
            color={darkMode ? "secondary" : "primary"}
            onClick={toggleDarkMode}
            sx={{ marginRight: 2, backgroundColor: "#92B9BD" }}
          >
            Dark Mode
          </Button>

          <Button
            variant="contained"
            onClick={Logout}
            sx={{
              marginRight: 2,
              backgroundColor: "#92B9BD",
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
}
