import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { colors } from "../styles/ThemeColors";

export default function Register({ darkMode }) {
  const navigate = useNavigate();
  const [existingUsers, setExistingUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllUsers");
      setExistingUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    pwHash: "",
    verifyPassword: "",
  });

  const { firstName, lastName, email, location, pwHash, verifyPassword } = user;

  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!user.firstName) {
      alert(
        "First Name must not be blank and should be between 3-50 characters."
      );
      return;
    }

    if (user.firstName.length < 3 || user.firstName.length > 50) {
      alert("First Name must be between 3-50 characters.");
      return;
    }

    if (!user.lastName) {
      alert(
        "Last Name must not be blank and should be between 3-50 characters."
      );
      return;
    }

    if (user.lastName.length < 3 || user.lastName.length > 50) {
      alert("Last Name must be between 3-50 characters.");
      return;
    }

    if (!user.pwHash) {
      alert("Password must not be blank and should be at least 5 characters.");
      return;
    }

    if (user.pwHash.length < 5) {
      alert("Password must be at least 5 characters.");
      return;
    }

    if (!user.verifyPassword || user.verifyPassword.trim() === "") {
      alert("Please confirm your password.");
      return;
    }

    if (user.pwHash !== user.verifyPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!user.email) {
      alert("Email must not be blank.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (!emailRegex.test(user.email)) {
      alert("Please provide a valid email address.");
      return;
    }

    if (!user.location) {
      alert("Location must not be blank.");
      return;
    }

    const emailExists = existingUsers.some(
      (existingUser) =>
        existingUser.email.toLowerCase() === user.email.toLowerCase()
    );

    if (emailExists) {
      alert("Email is already registered to a user.");
      return;
    }

    await axios.post("http://localhost:8080/register", user);
    navigate("/Chaptr");
  };

  const cancel = () => {
    navigate("/Chaptr");
  };

  return (
    <div className="register-user-container">
      <Paper
        className="register-user-paper"
        sx={{
          padding: 4,
          marginTop: "80px",
          backgroundColor: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <h1>Register User</h1>

        <form onSubmit={(e) => submit(e)}>
          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={inputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={inputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email Address"
            name="email"
            value={email}
            onChange={inputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Mailing Address"
            name="location"
            value={location}
            onChange={inputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            name="pwHash"
            type="password"
            value={pwHash}
            onChange={inputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Verify Password"
            name="verifyPassword"
            type="password"
            value={verifyPassword}
            onChange={inputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: darkMode ? colors.pink : colors.purple }}
            >
              Submit
            </Button>
            <Button
              onClick={() => cancel()}
              variant="contained"
              sx={{ backgroundColor: darkMode ? colors.purple : colors.pink }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}
