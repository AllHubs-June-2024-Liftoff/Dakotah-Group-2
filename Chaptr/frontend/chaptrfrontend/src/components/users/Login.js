import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function Login({ darkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Logging in with:", email, password);
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
            to ="/Register"
          >
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}
