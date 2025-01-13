import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile({ darkMode }) {
  const [user, setUser] = useState(null);
  const [tbr, setTbr] = useState({ tbr: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    //const storedTBR = JSON.parse(localStorage.getItem("tbrList"));

    if (storedUser) {
      setUser(storedUser);
      loadTBRLists(storedUser.email);
    } else {
      navigate("/Chaptr");
    }

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) {
        setUser(updatedUser);
        loadTBRLists(updatedUser.email);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const loadTBRLists = async (userEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tbr/email/${userEmail}`
      );
      setTbr(response.data);
      localStorage.setItem("tbrList", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching TBR Lists:", error);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();

    if (!tbr.tbr || tbr.tbr.length === 0) {
      alert(`${user.firstName}'s TBR List is empty!`);
    } else {
      try {
        await axios.delete(`http://localhost:8080/tbr/${tbr.id}`);
        localStorage.removeItem("tbrList");
        alert("TBR List deleted successfully!");
      } catch (error) {
        console.error(`Error deleting ${user.name}'s TBR List:`, error);
      }
    }
  };

  return (
    <div>
      <p>{`${user.firstName + " " + user.lastName}'s profile`}</p>

      <div>
        <img
          src={user.userImage || "path/to/default/image.jpg"}
          alt={user.firstName}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <Button
          variant="contained"
          component={Link}
          sx={{
            marginRight: 2,
            backgroundColor: "#92B9BD",
          }}
          to="/EditUser"
        >
          Upload Image
        </Button>
      </div>

      <div>
        <h1>{tbr.name || "My TBR List"}</h1>

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
                    {Array.isArray(book.author)
                      ? book.author.join(", ")
                      : book.author}
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

        <Button
          variant="contained"
          component={Link}
          sx={{
            marginRight: 2,
            backgroundColor: "#92B9BD",
          }}
          to="/SearchTBR"
        >
          Search Books
        </Button>
        <Button
          onClick={(e) => onDelete(e)}
          variant="contained"
          component={Link}
          sx={{
            marginRight: 2,
            backgroundColor: "#92B9BD",
          }}
          to="/Profile"
        >
          Delete TBR List
        </Button>
      </div>
    </div>
  );
}
