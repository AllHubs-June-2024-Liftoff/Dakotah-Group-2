import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { colors } from "../../styles/ThemeColors";

export default function BookCard(props) {
  const addToFavorites = async () =>{
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      alert("User is not logged in.");
      return;
    }
    const formattedAuthor = Array.isArray(props.author)
      ? props.author
      : [props.author];
    const bookData = {
      id: props.id,
      name: props.title,
      author: formattedAuthor,
      bookCover: props.image,
      publicationDate: props.publishedDate,
    };
    console.log("Sending book data:", bookData);

    try {
      const newBookResponse = await axios.post(
          "http://localhost:8080/addBook",
           bookData
      );
      console.log("Book added:", newBookResponse.data);
      const userBook = newBookResponse.data;
      const favoritesResponse = await axios.get(
          `http://localhost:8080/favorites/email/${storedUser.email}`
      );


      if (favoritesResponse.status === 404 ||
        !favoritesResponse.data ||
        !favoritesResponse.data.id
    ) {
        console.log(`Creating new Favorites List for: ${storedUser.name}`);
        const newFavoritesResponse = await axios.post(
            `http://localhost:8080/newFavorites/email/${storedUser.email}`,
            {bookId: userBook.id}
        );
        console.log("New Favorites List created:", newFavoritesResponse.data);
        alert("Book added to Favorites List");
    } else {
      const addToFavoritesResponse = await axios.put(
          `http://localhost:8080/favorites/${storedUser.email}`,
          userBook
      );

      if (addToFavoritesResponse.status === 200) {
          alert(`${userBook.name} added to ${storedUser.name}'s Favorites List`);
      }
    } //end of if/else
    } catch (error) {
      console.error("Error adding book to Favorites:", error);
      alert("An error occurred while adding the book.");
    }//end of try/catch
  };


  const addToTBR = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      alert("User is not logged in.");
      return;
    }
    const formattedAuthor = Array.isArray(props.author)
      ? props.author
      : [props.author];
    const bookData = {
      id: props.id,
      name: props.title,
      author: formattedAuthor,
      bookCover: props.image,
      publicationDate: props.publishedDate,
    };
    console.log("Sending book data:", bookData);

    try {
      const newBookResponse = await axios.post(
        "http://localhost:8080/addBook",
        bookData
      );
      console.log("Book added:", newBookResponse.data);
      const userBook = newBookResponse.data;
      const tbrResponse = await axios.get(
        `http://localhost:8080/tbr/email/${storedUser.email}`
      );

      if (
        tbrResponse.status === 404 ||
        !tbrResponse.data ||
        !tbrResponse.data.id
      ) {
        console.log(`Creating TBR List for: ${storedUser.name}`);
        const newTBRResponse = await axios.post(
          `http://localhost:8080/newTbr/email/${storedUser.email}`,
          { bookId: userBook.id }
        );
        console.log("New TBR created:", newTBRResponse.data);
        alert("Book added to TBR list");
      } else {
        const addToTBRResponse = await axios.put(
          `http://localhost:8080/tbr/${storedUser.email}`,
          userBook
        );

        if (addToTBRResponse.status === 200) {
          alert(`${userBook.name} added to ${storedUser.name}'s TBR list`);
        }
      }
    } catch (error) {
      console.error("Error adding book to TBR:", error);
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className="card-container">
      <img src={props.image} alt="book cover" />
      <div className="desc">
        <h2>{props.title}</h2>
        <h3>
          {Array.isArray(props.author) ? props.author.join(", ") : props.author}
        </h3>
        <p>
          {props.publishedDate === "0000"
            ? "Not available"
            : props.publishedDate.substring(0, 4)}
        </p>
      </div>
      <Button
          variant="contained"
          onClick={addToTBR}
          sx={{ marginRight: 2, backgroundColor: colors.blue }}
          >
          Add to TBR
      </Button>
      <Button
          variant="contained"
          onClick={addToFavorites}
          sx={{ marginRight: 2, backgroundColor: colors.blue }}
          >
          Add to Favorites
      </Button>
</div>
  );
}