import React, { useState, useEffect } from "react";
import axios from "axios";

const Club = ({ darkMode }) => {
  const [club, setClub] = useState({});

  const clubId = sessionStorage.getItem("clubId");

  const getClub = async () => {
    const response = await axios.get(`http://localhost:8080/club/${clubId}`);
    setClub(response.data);
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <div>
      <h2>{club.name}</h2>
      <div>
        {club.bookOfTheMonth == null ? "No book set yet!" : club.bookOfTheMonth}
      </div>
      <div>
        <p>
          {club.clubMessage == null
            ? "No description added!"
            : club.clubMessage}
        </p>
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
            {club.members != undefined ? (
              club.members.map((user) => {
                return (
                  <tr
                    style={{
                      backgroundColor: darkMode ? "#333" : "#fafafa",
                    }}
                    key={user.id}
                  >
                    <td>{user.name}</td>
                  </tr>
                );
              })
            ) : (
              <tr
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
