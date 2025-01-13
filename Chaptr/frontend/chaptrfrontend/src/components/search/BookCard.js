import React from "react";
import axios from "axios";

export default function BookCard(props) {
  const addToTBR = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

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
      const addBookResponse = await axios.post(
        "http://localhost:8080/addBook",
        bookData
      );
      console.log("Book added:", addBookResponse.data);

      const addedBook = addBookResponse.data;

      const tbrResponse = await axios.get(
        `http://localhost:8080/tbr/email/${storedUser.email}`
      );

      if (tbrResponse.status === 404) {
        console.log(`Creating TBR List for: ${storedUser.name}`);

        const newTBRResponse = await axios.post(
          `http://localhost:8080/newTbr/email/${storedUser.email}`,
          { bookId: addedBook.id }
        );
        console.log("New TBR created:", newTBRResponse.data);
        alert("Book added to TBR list");
      } else {
        const addToTBRResponse = await axios.put(
          `http://localhost:8080/tbr/${storedUser.email}`,
          {
            id: addedBook.id,
            name: addedBook.name,
            author: addedBook.author,
            bookCover: addedBook.bookCover,
            publicationDate: addedBook.publicationDate,
          }
        );

        if (addToTBRResponse.status === 200) {
          alert(`${addedBook.name} added to ${storedUser.name}'s TBR list`);
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
      <button onClick={addToTBR}>Add to TBR</button>
    </div>
  );
}
