import React, { useState } from "react";
import SearchArea from "./SearchArea";
import BookList from "./BookList";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchField, setSearchField] = useState("");

  const searchBook = async (e) => {
    e.preventDefault();
    try {
      const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchField}&key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      console.log("--------- DATA UP HERE! ---------");
      const cleanBooks = cleanData(data);
      setBooks(cleanBooks || []);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };

  const handleSort = (e) => {
    const sortOption = e.target.value;

    const sortedBooks = [...books].sort((a, b) => {
      if (sortOption === "Newest") {
        return (
          parseInt(b.volumeInfo.publishedDate?.substring(0, 4)) -
          parseInt(a.volumeInfo.publishedDate.substring(0, 4))
        );
      } else if (sortOption === "Oldest") {
        return (
          parseInt(a.volumeInfo.publishedDate?.substring(0, 4)) -
          parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        );
      }

      return 0;
    });

    setBooks(sortedBooks);
  };

  const cleanData = (data) => {
    if (!data.items) return [];

    return data.items.map((book) => {
      if (!book.volumeInfo.publishedDate) {
        book.volumeInfo.publishedDate = "0000";
      }

      if (!book.volumeInfo.imageLinks) {
        book.volumeInfo.imageLinks = {
          thumbnail:
            "https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337",
        };
      }
      return book;
    });
  };

  return (
    <div className="books">
      <SearchArea
        handleSearch={handleSearch}
        searchBook={searchBook}
        handleSort={handleSort}
      />
      <BookList books={books} />
    </div>
  );
}
