import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { colors } from "../../styles/ThemeColors";

export default function ProfileOwner({ darkMode }) {
    const [owner, setOwner] = useState(null);
    const [tbr, setTbr] = useState({ tbr: [] });
    const [userClubs, setUserClubs] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    const getUserClubs = async () => {
        const response = await axios.get(`http://localhost:8080/clubs/${id}`);
        setUserClubs(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        if (id) {
            const getProfileOwner = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/owner/${id}`);
                    setOwner(response.data);
                    getUserClubs();
                    if (response.data.email) {
                        loadTBRLists(response.data.email);
                    }
                } catch (error) {
                    console.error("Error fetching owner data:", error);
                }
            };

            getProfileOwner();
        }
    }, [id]);

    const loadTBRLists = async (userEmail) => {
        try {
            const response = await axios.get(`http://localhost:8080/tbr/email/${userEmail}`);
            setTbr(response.data);
        } catch (error) {
            console.error("Error fetching TBR Lists:", error);
        }
    };

    if (!owner) {
        return <div>Loading owner data...</div>;
    }

    const clubButton = async (clubId) => {
        sessionStorage.setItem("clubId", clubId);
        navigate("/Club");
    };

    return (
        <div>
            <div className="user-profile-display edit-user-profile-display">
                <img
                    src={owner.userImage || "path/to/default/image.jpg"}
                    alt={owner.firstName}
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
                <h1>{`${owner.firstName + " " + owner.lastName}`}</h1>
            </div>
            <div className="profile-clubs-container">
                <div className="profile-clubs">
                    <h1>My Clubs</h1>
                    {userClubs.length > 0 ? (
                        userClubs.map((club) => (
                            <div>
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
            </div>
            <div>
                <div className="left-text">
                    <h2>{tbr.name || "My TBR List"}</h2>
                </div>

                <div className="table-container">
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
                                    Cover
                                </th>
                                <th
                                    style={{
                                        padding: "10px",
                                        border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                    }}
                                >
                                    Author
                                </th>
                                <th
                                    style={{
                                        padding: "10px",
                                        border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                    }}
                                >
                                    Publication Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tbr.tbr.length > 0 ? (
                                tbr.tbr.map((book) => (
                                    <tr
                                        key={book.id}
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
                                            {book.name}
                                        </td>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                            }}
                                        >
                                            <img src={book.bookCover} alt={book.name} width="50" />
                                        </td>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                            }}
                                        >
                                            {Array.isArray(book.author) ? book.author.join(", ") : book.author}
                                        </td>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                            }}
                                        >
                                            {book.publicationDate}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        style={{
                                            textAlign: "center",
                                            padding: "10px",
                                            border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                                        }}
                                    >
                                        No books in TBR
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
