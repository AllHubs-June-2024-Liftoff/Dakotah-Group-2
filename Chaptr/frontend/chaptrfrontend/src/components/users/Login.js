import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ darkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tbrList");

    if (!password) {
      alert("Password must not be blank and should be at least 5 characters.");
      return;
    }

    if (password.length < 5) {
      alert("Password must be at least 5 characters.");
      return;
    }

    if (!email) {
      alert("Email must not be blank.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (!emailRegex.test(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        pwHash: password,
      });
      const user = response.data;

      if (user && user.id) {
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/Profile");
      } else {
        console.log("No user data returned");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
    console.log("Logging in with:", email);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#e0e0e0" : "#333",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          backgroundColor: darkMode ? "#121212" : "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: 3,
            color: darkMode ? "#ff1493" : "#9b4dff",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: darkMode ? "#333" : "#ffffff",
              color: darkMode ? "#e0e0e0" : "#333",
              "& .MuiInputLabel-root": {
                color: darkMode ? "#e0e0e0" : "#333",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#444" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#ff1493" : "#9b4dff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#ff1493" : "#9b4dff",
                },
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: darkMode ? "#333" : "#ffffff",
              color: darkMode ? "#e0e0e0" : "#333",
              "& .MuiInputLabel-root": {
                color: darkMode ? "#e0e0e0" : "#333",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#444" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#ff1493" : "#9b4dff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#ff1493" : "#9b4dff",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={darkMode ? "secondary" : "primary"}
            sx={{
              marginTop: "16px",
              backgroundColor: darkMode ? "#ff1493" : "#9b4dff",
            }}
          >
            Submit
          </Button>
          <Button
            component={Link}
            fullWidth
            variant="contained"
            color={darkMode ? "secondary" : "primary"}
            sx={{
              marginTop: "16px",
              backgroundColor: darkMode ? "#ff1493" : "#9b4dff",
            }}
            to="/Register"
          >
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}
