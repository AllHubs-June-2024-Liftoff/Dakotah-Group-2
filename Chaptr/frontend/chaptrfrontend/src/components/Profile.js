import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile({ darkMode }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
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
  }, [navigate]);
  const loadTBRLists = async (userEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tbr/email/${userEmail}`
      );
      if (response.data && response.data.tbr.length === 0) {
        setTbr({ tbr: [] });
      } else {
        setTbr(response.data);
      }
      sessionStorage.setItem("tbrList", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching TBR Lists:", error);
    }
  };
  const onDelete = async (e) => {
    e.preventDefault();

    if (!tbr.tbr.length) {
      alert(`${user.firstName}'s TBR List is empty!`);
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/tbr/${tbr.id}`);
      sessionStorage.removeItem("tbrList");
      alert(`${user.firstName}'s TBR List deleted successfully!`);
      setTbr({ tbr: [] });
    } catch (error) {
      console.error(`Error deleting ${user.firstName}'s TBR List:`, error);
    }
  };
  const removeBook = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:8080/tbr/${user.email}/book/${bookId}`
      );
      alert("Book removed successfully!");
      loadTBRLists(user.email);
    } catch (error) {
      console.error("Error removing book from TBR list:", error);
      alert("There was an error removing the book.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{`${user.firstName} ${user.lastName}'s profile`}</p>
      <div>
        <img
          src={user.userImage || "path/to/default/image.jpg"}
          alt={user.firstName}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <Button
          variant="contained"
          component={Link}
          sx={{ marginRight: 2, backgroundColor: "#92B9BD" }}
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
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Name
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Cover
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Author
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Publication Date
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                <Button
                  onClick={onDelete}
                  variant="contained"
                  sx={{ marginRight: 2, backgroundColor: "#92B9BD" }}
                >
                  Delete TBR List
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tbr.tbr.length > 0 ? (
              tbr.tbr.map((book) => (
                <tr
                  key={book.id}
                  style={{ backgroundColor: darkMode ? "#333" : "#fafafa" }}
                >
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {book.name}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <img src={book.bookCover} alt={book.name} width="50" />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {Array.isArray(book.author)
                      ? book.author.join(", ")
                      : book.author}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {book.publicationDate}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <Button
                      onClick={() => removeBook(book.id)}
                      variant="contained"
                      sx={{ marginRight: 2, backgroundColor: "#92B9BD" }}
                    >
                      Remove {book.name}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid #ccc",
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
          sx={{ marginRight: 2, backgroundColor: "#92B9BD" }}
          to="/SearchTBR"
        >
          Search Books
        </Button>
      </div>
    </div>
  );
}
//