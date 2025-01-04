import React, { useState, useEffect, version } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Navigate, NavLink, useNavigate, useHistory } from "react-router-dom";
import Club from "./Club";

const ClubsList = ({ darkMode }) => {
    const navigate = useNavigate();

    const [clubs, setClubs] = useState([]);
    const [showClub, setShowClub] = useState(false);

    useEffect(() => {
        getClubs();
    }, []);

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
            <h2>Clubs</h2>
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
                            {club.description}
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
                                    sessionStorage.setItem("clubId", club.id);
                                    // setTimeout(() => navToClub(), 1000);
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
