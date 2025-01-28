import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Description from "./Description";
import zIndex from "@mui/material/styles/zIndex";
import { colors } from "../../styles/ThemeColors";

const Club = ({ darkMode }) => {
  const [club, setClub] = useState({});
  const [members, setMembers] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();

  const clubId = sessionStorage.getItem("clubId");
  const user = sessionStorage.getItem("user");

  console.log(`club id: ${clubId}`);
  console.log(`user: ${user}`);

  const getClub = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/club/${clubId}`);
      setClub(response.data);
      const membersData = response.data.members || [];
      console.log("Updated members data: ", membersData);
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching club data:", error);
      alert("Error fetching club data!");
    }
  };

  const joinClub = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/Chaptr");
      return;
    }

    const usersEmail = JSON.parse(user);
    const email = usersEmail.email;

    try {
      const response = await axios.post(
        `http://localhost:8080/club/joinClub/${clubId}?email=${email}`
      );

      if (response.status === 200) {
        getClub();
      } else {
        console.log("Error joining club, response status:", response.status);
      }
    } catch (error) {
      console.error("Error joining club:", error);
      alert("Error joining club, please try again!");
    }
  };

  const navToSearch = () => {
    sessionStorage.setItem("clubId", club.id);
    navigate("/SearchClubBook");
  };

  const handleRefresh = () => {
    getClub();
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <div>
      <h2>{club.name || "Club name not available"}</h2>
      
      <div className="club-message-container">
        <div className="club-message">
          <p>{club.clubMessage || "No description added!"}</p>
        </div>
      </div>
        
        <div className="set-desc" style={{ zIndex: 1 }}>
          {showDescription ? (
            <Description
              clubId={club.id}
              onRefresh={handleRefresh}
              hideDescription={setShowDescription}
            />
          ) : (
            ""
          )}
          {!showDescription ? (
            <Button
              variant="contained"
              sx={{ marginRight: 2, backgroundColor: colors.blue }}
              onClick={() => setShowDescription(true)}
            >
              Edit Description
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ marginRight: 2, backgroundColor: colors.pink }}
              onClick={() => setShowDescription(false)}
            >
              Cancel
            </Button>
          )}
        </div>

      <div>
        {club.bookOfTheMonth != null ? (
          <div className="card-container">
            <img src={club.bookOfTheMonth.bookCover} alt="book cover" />
            <div className="desc">
              <h2>{club.bookOfTheMonth.name}</h2>
              <h3>
                {Array.isArray(club.bookOfTheMonth.author)
                  ? club.bookOfTheMonth.author.join(", ")
                  : club.bookOfTheMonth.author}
              </h3>
              <p>
                {club.bookOfTheMonth.publicationDate === "0000"
                  ? "Not available"
                  : club.bookOfTheMonth.publicationDate.substring(0, 4)}
              </p>
            </div>
          </div>
        ) : (
          <p>No book set!</p>
        )}

        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px 0", backgroundColor: "#9b4dff" }}
            onClick={navToSearch}
          >
            Change Book
          </Button>
        </div>
      </div>

      

      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px 0", backgroundColor: "#9b4dff" }}
          onClick={joinClub}
        >
          Join Club
        </Button>
      </div>

      <div>
        <table
          style={{
            width: "25%",
            borderCollapse: "collapse",
            color: darkMode ? "#e0e0e0" : "#333",
            float: "right",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: darkMode ? "#121212" : "#f5f5f5" }}>
              <th
                style={{
                  padding: "10px",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                }}
              >
                Members
              </th>
              <th
                style={{
                  padding: "10px",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                }}
              >
                View Profile
              </th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr
                  key={member.id}
                  style={{ backgroundColor: darkMode ? "#333" : "#fafafa" }}
                >
                  <td>{member.name}</td>
                  <td>
                    <Button
                      onClick={() => navigate(`/ProfileOwner/${member.id}`)}
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "#9b4dff" }}
                    >
                      {member.firstName}'s profile
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ backgroundColor: darkMode ? "#333" : "#fafafa" }}>
                <td
                  style={{
                    padding: "8px",
                    border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                  }}
                >
                  No Members!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Club;
