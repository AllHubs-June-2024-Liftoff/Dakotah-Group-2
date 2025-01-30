import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookCard(props) {
  const navigate = useNavigate();
  const setClubBook = async () => {
    const clubId = sessionStorage.getItem("clubId");

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

    const newBookResponse = await axios.post(
      `http://localhost:8080/club/${clubId}/book`,
      bookData
    );
    console.log("Book added:", newBookResponse.data);

    navigate("/Club");
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
      <button onClick={setClubBook}>Add to Club</button>
    </div>
  );
}
