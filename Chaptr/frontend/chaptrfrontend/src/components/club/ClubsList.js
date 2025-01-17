import React, { useState, useEffect, version } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClubsList = ({ darkMode }) => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        getClubs();
      } catch (error) {
        console.error("Please login", error);
        navigate("/Chaptr");
      }
    } else {
      navigate("/Chaptr");
    }
  }, [navigate]);
  const getClubs = async () => {
    const response = await axios.get("http://localhost:8080/club");
    setClubs(response.data);
    sessionStorage.setItem("clubId", null);
  };

  const navToClub = () => {
    navigate("/Club");
  };

  console.log(version);

  return (
    <>
      <div>
        <span>
          <h2>Clubs</h2>

          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: "5px",
              marginBottom: "10px",
              marginTop: "-10px",
              alignItems: "right",
              backgroundColor: "#9b4dff",
            }}
            onClick={() => navigate("/CreateClub")}
          >
            Create Club
          </Button>
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: darkMode ? "#e0e0e0" : "#333",
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
              Name
            </th>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
              }}
            >
              Book
            </th>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
              }}
            >
              Description
            </th>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
              }}
            >
              Options
            </th>
          </tr>
        </thead>
        {clubs.map((club) => (
          <tr
            key={club.id}
            style={{
              backgroundColor: darkMode ? "#333" : "#fafafa",
            }}
          >
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
              }}
            >
              {club.name}
            </td>
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
              }}
            >
              {club.bookOfTheMonth}
            </td>
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                width: "500px",
                wordWrap: "break-word",
              }}
            >
              {club.clubMessage.length > 200
                ? club.clubMessage.substr(0, 200) + ". . ."
                : club.clubMessage}
            </td>
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "5px", backgroundColor: "#9b4dff" }}
                onClick={() => {
                  sessionStorage.setItem("clubId", club.id);
                  navToClub();
                }}
              >
                View
              </Button>
            </td>
          </tr>
        ))}
      </table>
      <div></div>
    </>
  );
};

export default ClubsList;
