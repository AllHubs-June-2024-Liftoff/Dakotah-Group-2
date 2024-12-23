import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function NavBar({ darkMode, toggleDarkMode }) {
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
            to="/Dev"
          >
            Dev
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
            // onClick={logOut}
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
