import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { colors } from "../styles/ThemeColors";

export default function Profile({ darkMode }) {
  const [user, setUser] = useState(null);
  const [tbr, setTbr] = useState({ tbr: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        loadTBRLists(parsedUser.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/Chaptr");
      }
    } else {
      navigate("/Chaptr");
    }

    const handleStorageChange = () => {
      const updatedUser = sessionStorage.getItem("user");
      if (updatedUser) {
        try {
          const parsedUser = JSON.parse(updatedUser);
          setUser(parsedUser);
          loadTBRLists(parsedUser.email);
        } catch (error) {
          console.error("Error parsing updated user data:", error);
        }
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
      sessionStorage.setItem("tbrList", JSON.stringify(response.data));
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
        sessionStorage.removeItem("tbrList");
        alert("TBR List deleted successfully!");
      } catch (error) {
        console.error(`Error deleting ${user.name}'s TBR List:`, error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <div className="user-profile-display">    
        <img
          src={user.userImage || "path/to/default/image.jpg"}
          alt={user.firstName}
        />
        <div className="text-button-container">
          <h1>{`${user.firstName} ${user.lastName}`}</h1>          
          <Button
            className="upload-img-btn"
            variant="contained"
            component={Link}
            sx={{ marginRight: 2, backgroundColor: colors.blue }}
            to="/EditUser"
            >
            Upload Image
          </Button>
        </div>
      </div>
      
      //stuff i'm adding in
      <div>
        <table>
          <thead>
            <tr>
              <th>Book Image 1</th>
              <th>Book Image 2</th>
              <th>Book Image 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Remove Btn 1</td>
              <td>Remove Btn 2</td>
              <td>Remove Btn 3</td>
            </tr>
          </tbody>
        </table>
      </div>
//end

      <div>
        <div className="TBR-text-and-search-btn">
          <h2>{tbr.name || "My TBR List"}</h2>
          <Button
            variant="contained"
            component={Link}
            sx={{ marginRight: 2, backgroundColor: colors.blue }}
            to="/SearchTBR"
          >
            Search Books
          </Button>
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
        
      </div>
    </div>
  );
}
//