import React, { useState } from "react";
import axios from "axios";

export default function FavoritesList({ user }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavoritesLists = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getUserFavoritesListById/${id}`
      );
      setFavorites(response.data.favoritesList);
    } catch (error) {
      console.error("Error fetching Favorites Lists:", error);
    }
  };

  if (user.id) {
    try {
      loadFavoritesLists(user.id);
    } catch (error) {
      console.error("Error fetching Favorites List: ", error);
    }
  } else {
    return <div>Loading owner data...</div>;
  }

  return (
    <div className="favorites-books">
      <h2>My Favorites List</h2>
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <div className="img-btn-container" key={book.id}>
            <img
              src={book.bookCover}
              alt={book.name}
              style={{ width: "8rem", height: "auto" }}
            />
          </div>
        ))
      ) : (
        <p>No favorite books found.</p>
      )}
    </div>
  );
}
