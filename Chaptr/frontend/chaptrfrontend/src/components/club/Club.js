import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClubDescription from "./ClubData/ClubDescription";
import MembersList from "./ClubData/MembersList";
import BookOfTheMonth from "./ClubData/BookOfTheMonth";

const Club = ({ darkMode }) => {
  const [club, setClub] = useState({});
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const clubId = sessionStorage.getItem("clubId");
  const user = sessionStorage.getItem("user");
  const getClub = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getClubUser/${clubId}`
      );
      setClub(response.data);
      setMembers(response.data.members || []);
    } catch (error) {
      console.error("Error fetching club data:", error);
      alert("Error fetching club data!");
    }
  };
  const joinClub = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/Chaptr");
      return;
    }
    const usersEmail = JSON.parse(user);
    const email = usersEmail.email;

    try {
      const response = await axios.post(
        `http://localhost:8080/joinClub/${clubId}?email=${email}`
      );
      if (response.status === 200) {
        getClub();
      } else {
        console.log("Error joining club, response status:", response.status);
      }
    } catch (error) {
      console.error("Error joining club:", error);
      alert("Error joining club, please try again!");
    }
  };
  const navToSearch = () => {
    sessionStorage.setItem("clubId", club.id);
    navigate("/SearchClubBook");
  };
  const handleRefresh = () => {
    getClub();
  };
  useEffect(() => {
    getClub();
  }, []);

  return (
    <div>
      <h2>{club.name || "Club name not available"}</h2>
      <div className="club-wrapper">
        <div className="club-content">
          <ClubDescription
            club={club}
            onDescriptionEdit={handleRefresh}
            darkMode={darkMode}
          />
          <BookOfTheMonth
            book={club.bookOfTheMonth}
            onChangeBook={navToSearch}
          />
          <MembersList members={members} joinClub={joinClub} />
        </div>
      </div>
    </div>
  );
};

export default Club;
