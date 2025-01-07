import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateClub = () => {
  const navigate = useNavigate();

  const [newClub, setNewClub] = useState({
    name: "",
    clubMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClub({
      ...newClub,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClubObject = {
      name: newClub.name,
      clubMessage: newClub.clubMessage,
    };

    await axios.post("http://localhost:8080/club/create", newClubObject);

    navigate("/ClubsList");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newClub.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="clubMessage"
          value={newClub.clubMessage}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateClub;
