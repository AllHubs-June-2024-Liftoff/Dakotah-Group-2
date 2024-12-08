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
            color={darkMode ? "secondary" : "primary"}
            onClick={toggleDarkMode}
            sx={{ marginRight: 2, backgroundColor: "#daa520" }}
          >
            Dark Mode
          </Button>

          <Button
            variant="contained"
            component={Link}
            sx={{
              marginRight: 2,
              backgroundColor: "#9b4dff",
            }}
            to="/"
          >
            Charactr
          </Button>
          <Button
            variant="contained"
            component={Link}
            sx={{
              marginRight: 2,
              backgroundColor: "#ff1493",
            }}
            to="/Login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            component={Link}
            sx={{
              marginRight: 2,
              backgroundColor: "#40e0d0",
            }}
            to="/RegisterUser"
          >
            Register
          </Button>
        </div>
      </nav>
    </div>
  );
}
