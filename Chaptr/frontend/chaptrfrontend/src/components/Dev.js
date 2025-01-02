import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper, Button, Box } from "@mui/material";

export default function Home({ darkMode }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8080/users");
            setUsers(result.data);
            setLoading(false);
        } catch (error) {
            setError("An error occurred while fetching users.");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    backgroundColor: darkMode ? "#121212" : "#f5f5f5",
                    color: darkMode ? "#e0e0e0" : "#333",
                    padding: "20px",
                }}
            >
                <div>Loading users...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    backgroundColor: darkMode ? "#121212" : "#f5f5f5",
                    color: darkMode ? "#e0e0e0" : "#333",
                    padding: "20px",
                }}
            >
                <div>{error}</div>
            </div>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: darkMode ? "#2E2E2E" : "#ffffff",
                color: darkMode ? "#e0e0e0" : "#333",
                padding: "40px",
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{
                    marginBottom: 3,
                    color: darkMode ? "#ff1493" : "#9b4dff",
                }}
            >
                User Profiles
            </Typography>

            <Paper
                sx={{
                    overflowX: "auto",
                    backgroundColor: darkMode ? "#1c1c1c" : "#f0f0f0",
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
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
                                Profile Picture
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                }}
                            >
                                Full Name
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                }}
                            >
                                First Name
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                }}
                            >
                                Last Name
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
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
                                    {user.image}
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                    }}
                                >
                                    {user.name}
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                    }}
                                >
                                    {user.firstName}
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                    }}
                                >
                                    {user.lastName}
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                    }}
                                >
                                    <Button variant="contained" color="primary" style={{ marginRight: "5px", backgroundColor: "#9b4dff" }}>
                                        View
                                    </Button>
                                    <Button variant="contained" style={{ marginRight: "5px", backgroundColor: "#40e0d0" }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" style={{ marginRight: "5px", backgroundColor: "#FF0000" }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>
        </Box>
    );
}
