import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Club = ({ darkMode }) => {
  const [club, setClub] = useState({});
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const clubId = sessionStorage.getItem("clubId");
  const user = localStorage.getItem("user");

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

  useEffect(() => {
    getClub();
  }, []);

  return (
    <div>
      <h2>{club.name || "Club name not available"}</h2>
      <div>
        <p>{club.bookOfTheMonth || "No book set yet!"}</p>
        <p>{club.clubMessage || "No description added!"}</p>
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
