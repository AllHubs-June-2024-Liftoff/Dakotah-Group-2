import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout")
      .then(() => {
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");

        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed: ", error.response || error);
      });
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
            Chaptr
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
            to="/Register"
          >
            Register
          </Button>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              marginRight: 2,
              backgroundColor: "#ff6347",
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
}
