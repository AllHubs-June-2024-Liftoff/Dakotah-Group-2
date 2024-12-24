import React, { useState, useRef } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditUser({ darkMode }) {
  const existingUser = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

  const { firstName, lastName, email, location, pwHash, verifyPassword } = user;

  const selectImage = () => {
    inputRef.current.click();
  };

  const uploadImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("email", existingUser.email);

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (pwHash !== verifyPassword) {
      alert("Passwords do not match.");
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
        "There was an error updating the user data. Please try again later."
      );
      navigate("/Chaptr");
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
          alt={`Profile photo of ${existingUser.firstName}`}
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
        Edit User
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
            disabled={loading}
          >
            {loading ? "Updating..." : "Submit"}
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
