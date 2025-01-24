import React, { useState, useEffect, version } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles/ThemeColors";


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
                            backgroundColor: colors.purple,
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
          color: darkMode ? colors.lightGrey : colors.blueGrey,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: darkMode ? colors.black : colors.whitesmoke }}>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
              }}
            >
              Book
            </th>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
              }}
            >
              Description
            </th>
            <th
              style={{
                padding: "10px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
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
              backgroundColor: darkMode ? colors.blueGrey : colors.whitersmoke,
            }}
          >
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
              }}
            >
              {club.name}
            </td>
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
              }}
            >
              {club.bookOfTheMonth}
            </td>
            <td
              style={{
                padding: "8px",
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
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
                border: `1px solid ${darkMode ? colors.darkGrey : colors.silverGrey}`,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "5px", backgroundColor: colors.purple }}
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
