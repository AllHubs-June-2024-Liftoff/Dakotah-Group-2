import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../styles/ThemeColors";

export default function Profile() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/Chaptr");
      }
    } else {
      navigate("/Chaptr");
    }
  }, [navigate]);

  if (!user) {
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
