import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
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
        `http://localhost:8080/getUserFavoritesList/${userEmail}`
      );
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
        `http://localhost:8080/deleteFavoritesList/${favoritesListId}`
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
  const removeBookFavoritesList = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:8080/deleteBookFromFavoritesList/${user.email}/${bookId}`
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

  return (
    <>
      <div className="favorites-container">
        <div className="favorites-title-and-btn">
          <h3>Favorite Books</h3>

          <Button
            variant="contained"
            component={Link}
            sx={{ marginRight: 2 }}
            to="/SearchBooks"
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
              sx={{ marginRight: 2 }}
            >
              Delete Favorites List
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
                    removeBookFavoritesList(book.id);
                  }}
                  variant="contained"
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
    </>
  );
}
