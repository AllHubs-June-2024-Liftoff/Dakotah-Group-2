import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register({ darkMode }) {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    pwHash: "",
  });

  const { firstName, lastName, email, location, pwHash, verifyPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/register", user);
    navigate("/Chaptr");
  };

  const onCancel = () => {
    navigate("/Chaptr");
  };

  return (
    <Paper
      sx={{
        padding: 4,
        marginTop: "80px",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: 3,
          color: darkMode ? "#40e0d0" : "#9b4dff",
        }}
      >
        Register User
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email Address"
          name="email"
          value={email}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Mailing Address"
          name="location"
          value={location}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          name="pwHash"
          type="password"
          value={pwHash}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Verify Password"
          name="verifyPassword"
          type="password"
          value={verifyPassword}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 3 }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ width: "48%" }}
          >
            Submit
          </Button>
          <Button
            onClick={() => onCancel()}
            variant="outlined"
            color="secondary"
            sx={{ width: "48%" }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
}
