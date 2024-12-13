import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar({ darkMode, toggleDarkMode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn state has changed to:", isLoggedIn);
  }, [isLoggedIn]); // This hook runs whenever `isLoggedIn` changes

  useEffect(() => {
    console.log("Checking login status...");

    axios
      .get("http://localhost:8080/checkLogin", { withCredentials: true })
      .then((response) => {
        console.log("Login check response:", response.data);
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error.response || error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout", { withCredentials: true })
      .then(() => {
        console.log("Logging out..."); // Debug log for logout action
        setIsLoggedIn(false); // Update state to false
        console.log("State after logout:", isLoggedIn); // Check if state updates immediately
        navigate("/"); // Redirect to the homepage after logout
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
            disabled={!isLoggedIn} // Disable button if not logged in
          >
            Logout
          </Button>

          <p>Logged in: {isLoggedIn ? "Yes" : "No"}</p>
        </div>
      </nav>
    </div>
  );
}
