import React, { useEffect } from "react";
import Login from "../components/users/Login";
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
          {/*book logo with conditional rendering for dark mode*/}
          { darkMode ? (
            <a href="https://imgur.com/d7lApr8"><img src="https://i.imgur.com/d7lApr8.png" title="source: imgur.com" alt="Book Logo - Dark Mode" 
            width="40" height="40"  /></a>
          ) : (
            <a href="https://imgur.com/uJulko6"><img src="https://i.imgur.com/uJulko6.png" title="source: imgur.com"  alt="Book Logo - Light Mode" 
              width="40" height="40" /></a>
          )}    
          
        <h1>Chaptr</h1>
        </div>

        <h2>Discover your next favorite book</h2>
        <p>Search through over 40 million books to start your next adventure</p>

        <h2>Save to your TBR</h2>
        <p>Keep all the books you want to read in one place</p>

        <h2>Join a book club</h2>
        <p>Start a book club with your friends and view the book of the month</p>

        <h2>Compare TBR Lists</h2>
        <p>Can't decide on the club's next read? View TBR lists of other memebers to choose which book you'll discuss next</p>
       
      </div>


      <div className="chaptr-login">
        <Login darkMode={darkMode} />
      </div>
     
     
    </div>
  );
}
