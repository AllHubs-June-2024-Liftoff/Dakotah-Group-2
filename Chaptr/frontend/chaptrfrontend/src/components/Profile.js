import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/Chaptr");
    }

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) {
        setUser(updatedUser);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{`${user.firstName + " " + user.lastName}'s profile`}</h1>

      <div>
        <img
          src={user.userImage || "path/to/default/image.jpg"}
          alt={user.firstName}
        />
        <Button
          variant="contained"
          component={Link}
          sx={{
            marginRight: 2,
            backgroundColor: "#92B9BD",
          }}
          to="/EditUser"
        >
          Upload Image
        </Button>
      </div>

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
