import React from "react";
import { Button } from "@mui/material";
import { colors } from "../../styles/ThemeColors";

const BookOfTheMonth = ({ book, onChangeBook }) => {
  return (
    <div className="book-card club-book-card">
      {book ? (
        <div className="card-container">
          <img src={book.bookCover} alt="book cover" />
          <div className="desc">
            <h2>{book.name}</h2>
            <h3>
              {Array.isArray(book.author)
                ? book.author.join(", ")
                : book.author}
            </h3>
            <p>
              {book.publicationDate === "0000"
                ? "Not available"
                : book.publicationDate.substring(0, 4)}
            </p>
          </div>
        </div>
      ) : (
        <p>No book set!</p>
      )}

      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px 0", backgroundColor: colors.purple }}
          onClick={onChangeBook}
        >
          Change Book
        </Button>
      </div>
    </div>
  );
};

export default BookOfTheMonth;
