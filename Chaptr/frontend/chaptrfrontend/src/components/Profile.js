import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const Profile = ({ darkMode }) => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/Chaptr");
    }
  };

  return (
    <div>
      <h1>User Profile</h1>

      <Button
        variant="contained"
        component={Link}
        sx={{
          marginRight: 2,
          backgroundColor: "#92B9BD",
        }}
        to="/SearchTBR"
      >
        Add book to TBR
      </Button>
    </div>
  );
}
