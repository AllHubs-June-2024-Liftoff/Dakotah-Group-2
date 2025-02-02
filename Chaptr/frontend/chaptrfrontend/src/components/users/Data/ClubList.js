import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { colors } from "../../styles/ThemeColors";

export default function TBRList({ darkMode }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
  const [userClubs, setUserClubs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        getUserClubs();
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/Chaptr");
      }
    } else {
      navigate("/Chaptr");
    }
  }, [navigate]);
  const getUserClubs = async () => {
    const response = await axios.get(
      `http://localhost:8080/getUserClubs/${user.id}`
    );
    setUserClubs(response.data);
  };
  const clubButton = async (clubId) => {
    sessionStorage.setItem("clubId", clubId);
    navigate("/Club");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-clubs-container">
      <div className="profile-clubs">
        <h1>My Clubs</h1>
        {userClubs.length > 0 ? (
          userClubs.map((club) => (
            <div className="club-button">
              <Button
                key={club.id}
                onClick={() => clubButton(club.id)}
                variant="contained"
                style={{
                  backgroundColor: darkMode ? colors.pink : colors.purple,
                }}
              >
                {club.name}
              </Button>
            </div>
          ))
        ) : (
          <div>
            <p>Not a member of any clubs yet!</p>
            <Button
              variant="contained"
              component={Link}
              sx={{
                marginRight: 2,
                backgroundColor: colors.purple,
              }}
              to="/ClubsList"
            >
              Go to Clubs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
