import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../styles/ThemeColors";

export default function Profile({ user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/Chaptr");
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="user-profile-display">
        <img src={user.userImage} alt={user.firstName} />
        <div className="text-button-container">
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <Button
            className="upload-img-btn"
            variant="contained"
            component={Link}
            sx={{ marginRight: 2, backgroundColor: colors.blue }}
            to="/UpdateUser"
          >
            Upload Image
          </Button>
        </div>
      </div>
    </>
  );
}
