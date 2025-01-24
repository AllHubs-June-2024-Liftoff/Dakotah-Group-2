import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../styles/ThemeColors";

export default function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tbrList");
    sessionStorage.removeItem("clubId");
    navigate("/Chaptr");
  };

  return (
    <div>
      <nav>
        <div
          style={{
            backgroundColor: darkMode ? colors.black : colors.whitesmoke,
            padding: "10px",
          }}
        >
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
      </nav>
    </div>
  );
}
