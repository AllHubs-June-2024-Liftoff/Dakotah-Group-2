import React from "react";
import BookCard from "./BookCard";

export default function BookList(props) {
  return (
    <div className="list">
      {props.books.map((book, i) => {
        let bookImage = "";
        if (book.volumeInfo.imageLinks == null) {
          bookImage = "";
        } else {
          bookImage = book.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <BookCard
            key={i}
            image={bookImage}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors}
            publishedDate={book.volumeInfo.publishedDate}
            ISBN10={book.volumeInfo.title}
          />
        );
      })}
    </div>
  );
}
