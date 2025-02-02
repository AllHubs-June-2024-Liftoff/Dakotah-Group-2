import React, { useEffect } from "react";
import Login from "../components/users/Login";
import Register from "../components/users/Register";
import { useNavigate } from "react-router-dom";

export default function Chaptr({ darkMode }) {
  const navigate = useNavigate();

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    if (storedUser) {
      navigate("/Profile");
    }
  });

  return (
    <div className="chaptr-container">
      <div className="chaptr-desc">
        <div className="logo-title">
          {/*book logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="24"
            height="24"
          >
            <path
              d="M96 32C43 32 0 75 0 128V384C0 437 43 480 96 480H448V32H96zM384 384H96C69.5 384 48 362.5 48 336S69.5 288 96 288H384V384z"
              fill="currentColor"
            />
          </svg>
          <h1>Chaptr</h1>
        </div>

        <h2>Discover your next favorite book</h2>
        <p>Search through over 40 million books to start your next adventure</p>

        <h2>Save to your TBR</h2>
        <p>Keep all the books you want to read in one place</p>

        <h2>Join a book club</h2>
        <p>
          Start a book club with your friends and view the book of the month
        </p>

        <h2>Compare TBR Lists</h2>
        <p>
          Can't decide on the club's next read? View TBR lists of other memebers
          to choose which book you'll discuss next
        </p>
      </div>

      <div className="chaptr-login">
        <Login darkMode={darkMode} />
      </div>
    </div>
  );
}
