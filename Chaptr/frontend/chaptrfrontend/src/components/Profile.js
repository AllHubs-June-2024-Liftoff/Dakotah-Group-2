import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { colors } from "../components/styles/ThemeColors";

export default function Profile({ darkMode }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
  const [favorites, setFavorites] = useState([]);
  const [tbr, setTbr] = useState({ tbr: [] });
  const [userClubs, setUserClubs] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        loadTBRLists(parsedUser.email);
        getUserClubs();
        loadFavoritesLists(parsedUser.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/Chaptr");
      }
    } else {
      navigate("/Chaptr");
    }
  }, [navigate]);
  const loadFavoritesLists = async (userEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/favorites/email/${userEmail}`
      );
      console.log("Favorites Response:", response.data);
      if (response.data && response.data.favoritesList.length === 0) {
        setFavorites([]);
      } else {
        setFavorites(response.data.favoritesList);
      }
      sessionStorage.setItem("favoritesList", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching Favorites Lists:", error);
    }
  };
  const loadTBRLists = async (userEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getTBR/email/${userEmail}`
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
  const deleteTBR = async (e) => {
    e.preventDefault();

        if (!tbr.tbr.length) {
            alert(`${user.firstName}'s TBR List is empty!`);
            return;
        }

    try {
      await axios.delete(`http://localhost:8080/deleteTBR/${tbr.id}`);
      sessionStorage.removeItem("tbrList");
      alert(`${user.firstName}'s TBR List deleted successfully!`);
      setTbr({ tbr: [] });
    } catch (error) {
      console.error(`Error deleting ${user.firstName}'s TBR List:`, error);
    }
  };
  const removeBookTBR = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:8080/deleteBook/${user.email}/${bookId}`
      );
      alert("Book removed successfully!");
      loadTBRLists(user.email);
    } catch (error) {
      console.error("Error removing book from TBR list:", error);
      alert("There was an error removing the book.");
    }
  };
  const deleteFavorites = async (e) => {
    e.preventDefault();

    if (!favorites.length) {
      alert(`${user.firstName}'s Favorites List is empty!`);
      return;
    }
    const storedFavorites = JSON.parse(sessionStorage.getItem("favoritesList"));

    if (!storedFavorites || !storedFavorites.id) {
      console.error("Favorites list ID is missing");
      return;
    }
    const favoritesListId = storedFavorites.id;

    try {
      await axios.delete(
        `http://localhost:8080/deleteFavorites/${favoritesListId}`
      );
      sessionStorage.removeItem("favoritesList");
      alert(`${user.firstName}'s Favorites List deleted successfully!`);
      setFavorites([]);
    } catch (error) {
      console.error(
        `Error deleting ${user.firstName}'s Favorites List:`,
        error
      );
    }
  };
  const removeBookFavorites = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:8080/deleteBookFromFavorites/${user.email}/${bookId}`
      );
      alert("Book removed successfully!");
      loadFavoritesLists(user.email);
    } catch (error) {
      console.error("Error removing book from Favorites list:", error);
      alert("There was an error removing the book.");
    }
  };

    if (!user) {
        return <div>Loading...</div>;
    }

  const getUserClubs = async () => {
          const response = await axios.get(`http://localhost:8080/clubs/${user.id}`); 
          setUserClubs(response.data);
      };

      const clubButton = async (clubId) => {
          sessionStorage.setItem("clubId", clubId);
          navigate("/Club");
      };

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
      <div className="favorites-container">
        <div className="favorites-title-and-btn">
          <h3>Favorite Books</h3>

          <Button
            variant="contained"
            component={Link}
            sx={{ marginRight: 2, backgroundColor: colors.blue }}
            to="/SearchTBR"
          >
            Add Book
          </Button>
        </div>
        <div className="favorites-books">
          <h2>
            My Favorites List{" "}
            <Button
              onClick={deleteFavorites}
              variant="contained"
              sx={{ marginRight: 2, backgroundColor: colors.blue }}
            >
              Delete Favorites
            </Button>
          </h2>
          {favorites.length > 0 ? (
            favorites.map((book) => (
              <div className="img-btn-container" key={book.id}>
                <img
                  src={book.bookCover}
                  alt={book.name}
                  style={{ width: "8rem", height: "auto" }}
                />
                <Button
                  onClick={() => {
                    removeBookFavorites(book.id);
                  }}
                  variant="contained"
                  sx={{ backgroundColor: colors.blue}}
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <p>No favorite books found.</p>
          )}
        </div>
      </div>

      <div className="profile-clubs-container">
                          <div className="profile-clubs">
                              <h1>My Clubs</h1>
                              {userClubs.length > 0 ? (
                                  userClubs.map((club) => (
                                      <div className="club-button">
                                          <Button
                                              key={club.id}
                                              onClick={() => clubButton(club.id)}
                                              variant="contained"
                                              style={{ backgroundColor: darkMode? colors.pink : colors.purple }}
                                          >
                                              {club.name}
                                          </Button>
                                      </div>
                                  ))
                              ) : (
                                  <div>
                                    <p>Not a member of any clubs yet!</p>
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
                              )}

                          </div>
                      </div>
                  
                  

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
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                  <Button
                    onClick={deleteTBR}
                    variant="contained"
                    sx={{ marginRight: 2, backgroundColor: colors.blue }}
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
                      {book.publicationDate
                        ? book.publicationDate.split("-")[0]
                        : "N/A"}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      <Button
                        onClick={() => removeBookTBR(book.id)}
                        variant="contained"
                        sx={{ marginRight: 2, backgroundColor: colors.blue }}
                      >
                        Remove Book
                      </Button>
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
