import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { colors } from "../../styles/ThemeColors";

export default function ClubList({ user }) {
  const [userClubs, setUserClubs] = useState([]);
  const navigate = useNavigate();
  const clubButton = async (clubId) => {
    sessionStorage.setItem("clubId", clubId);
    navigate("/Club");
  };
  const getUserClubs = async () => {
    const response = await axios.get(
      `http://localhost:8080/getUserClubs/${user.id}`
    );
    setUserClubs(response.data);
  };

  useEffect(() => {
    try {
      getUserClubs();
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  });

  if (!user) {
    return <div>Loading owner data...</div>;
  }

  return (
    <div className="profile-owner-clubs-container">
      <div className="profile-clubs">
        <h1>My Clubs</h1>
        {userClubs.length > 0 ? (
          userClubs.map((club) => (
            <div className="club-button">
              <Button
                key={club.id}
                onClick={() => clubButton(club.id)}
                variant="contained"
                style={{ backgroundColor: colors.purple }}
              >
                {club.name}
              </Button>
            </div>
          ))
        ) : (
          <p>Not a member of any clubs yet!</p>
        )}
      </div>
    </div>
  );
}
