import React, { useState, useEffect, version } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClubsList = ({ darkMode }) => {
    const navigate = useNavigate();

    const [clubs, setClubs] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getClubs();
    }, []);

    const getClubs = async () => {
        const response = await axios.get("http://localhost:8080/club");
        setClubs(response.data);
    };

    const navToClub = () => {
        const clubId = sessionStorage.getItem("clubId");
        sessionStorage.setItem("clubId", clubId);
        navigate("/Club");
    };

    // const joinClub = async (clubId, userId) => {
    //     sessionStorage.setItem("clubId", clubId);
    //     const club = sessionStorage.getItem("clubId");
    //     await axios.post(`http://localhost:8080/club/${clubId}/addMember/${userId}`);
    //     navToClub(club);
    // };

    const joinClub = async (e) => {
        const clubId = sessionStorage.getItem("clubId");
        await axios.post(`http://localhost:8080/club/${clubId}/addMember/${user.id}`);
        navToClub();
    };

    return (
        <>
            <div style={{}}>
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
                            }}
                        >
                            {club.clubMessage}
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
                                onClick={async () => {
                                    navToClub();
                                }}
                            >
                                View
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: "5px", backgroundColor: "#40e0d0" }}
                                onClick={async () => {
                                    joinClub(club.id, user.id);
                                }}
                            >
                                Join
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
