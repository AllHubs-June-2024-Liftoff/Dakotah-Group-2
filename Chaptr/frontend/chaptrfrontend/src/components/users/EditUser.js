import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditUser({ darkMode }) {
  const existingUser = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const inputRef = useRef();
  const [user, setUser] = useState({
    firstName: existingUser.firstName || "",
    lastName: existingUser.lastName || "",
    email: existingUser.email || "",
    location: existingUser.location || "",
    pwHash: "",
    verifyPassword: "",
    userImage: existingUser.userImage || "",
  });
  const [imagePreview, setImagePreview] = useState(existingUser.userImage);
  const { firstName, lastName, location, pwHash, verifyPassword } = user;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser((prev) => ({
        ...prev,
        ...storedUser,
      }));
    }
  }, []);

  const selectImage = () => {
    inputRef.current.click();
  };

  const uploadImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("email", existingUser.email);

    try {
      const response = await axios.put("http://localhost:8080/image", formData);
      const updatedImageUrl = response.data.imageUrl || user.userImage;

      setUser((prev) => ({
        ...prev,
        userImage: updatedImageUrl,
      }));

      setImagePreview(URL.createObjectURL(file));

      const updatedUser = { ...user, userImage: updatedImageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
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

    if (!existingUser.email) {
      alert("Email is missing.");
      return;
    }

    const updatedUser = { ...user, email: existingUser.email };

    try {
      await axios.put(
        `http://localhost:8080/editUser/${existingUser.email}`,
        updatedUser
      );

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      navigate("/Profile");
    } catch (error) {
      console.error("Failed to update user information:", error);
      alert(
        `There was an error updating ${user.name}'s data. Please try again later.`
      );
      navigate("/Profile");
    }
  };

  const onCancel = () => {
    navigate("/Profile");
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
      <div>
        <img
          src={imagePreview || existingUser.userImage}
          alt={existingUser.firstName}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <div>
          <button onClick={selectImage}>Change Image</button>
        </div>
      </div>
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: 3,
          color: darkMode ? "#40e0d0" : "#9b4dff",
        }}
      >
        <h1>{`Edit ${user.firstName + " " + user.lastName}'s Profile`}</h1>
      </Typography>
      <form>
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => uploadImage(e.target.files[0])}
          name="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </form>
      <form onSubmit={onSubmit}>
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
            onClick={onCancel}
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
