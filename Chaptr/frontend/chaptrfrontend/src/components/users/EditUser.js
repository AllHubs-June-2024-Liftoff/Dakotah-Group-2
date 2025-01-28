import React, { useState, useRef } from "react";
import { TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles/ThemeColors";

export default function EditUser({ darkMode }) {
  const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const inputRef = useRef();
  const [user, setUser] = useState({
    firstName: storedUser.firstName || "",
    lastName: storedUser.lastName || "",
    email: storedUser.email || "",
    location: storedUser.location || "",
    pwHash: "",
    verifyPassword: "",
    userImage: storedUser.userImage || "",
  });
  const [imagePreview, setImagePreview] = useState(storedUser.userImage);
  const { firstName, lastName, location, pwHash, verifyPassword } = user;
  const selectImage = () => {
    inputRef.current.click();
  };
  const uploadImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("email", storedUser.email);

    try {
      const response = await axios.put("http://localhost:8080/image", formData);
      const updatedImageUrl = response.data.imageUrl || user.userImage;
      setUser((prev) => ({
        ...prev,
        userImage: updatedImageUrl,
      }));
      setImagePreview(URL.createObjectURL(file));
      const updatedUser = { ...user, userImage: updatedImageUrl };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
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

    if (!storedUser.email) {
      alert("Email is missing.");
      return;
    }
    const updatedUser = { ...user, email: storedUser.email };

    try {
      await axios.put(
        `http://localhost:8080/editUser/${storedUser.email}`,
        updatedUser
      );
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setTimeout(() => {
        navigate("/Profile");
      }, 500);
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
    <div>

    <div className="user-profile-display edit-user-profile-display">      
        <img
          src={imagePreview || storedUser.userImage}
          alt={storedUser.firstName}
          />
        <div className="text-button-container">
          <h1>{`Edit ${user.firstName + " " + user.lastName}'s Profile`}</h1>
          <Button
          onClick={selectImage}
          variant="contained"
          sx={{backgroundColor: colors.blue}}>Change Image</Button>        
        </div> 
      </div>

    <div className="edit-user-container">
    <Paper
      className="edit-user-paper"
      sx={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >  
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
            sx={{ backgroundColor: darkMode?  colors.pink : colors.purple}}
          >
            Submit
          </Button>
          <Button
            onClick={onCancel}
            variant="contained"            
            sx={{ backgroundColor: darkMode?  colors.purple : colors.pink}}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
    </div>
    </div>
  );
}
