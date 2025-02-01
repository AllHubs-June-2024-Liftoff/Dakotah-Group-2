import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { colors } from "../styles/ThemeColors";

const Description = ({ clubId, onRefresh, hideDescription }) => {
  const [newDescription, setNewDescription] = useState("");

  const submitDescription = async (e) => {
    e.preventDefault();

    if (newDescription.length < 1) {
      alert("Club descripition must be populated to change!");
      return;
    }

    await axios.post(
      `http://localhost:8080/createClubDescription/${clubId}/${newDescription}`
    );
    hideDescription(false);
    onRefresh();
  };

  const handleInput = (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
    console.log(newDescription);
  };

  return (
    <form onSubmit={submitDescription}>
      <div className="edit-desc-container">
        <div>
          <label>Update Description</label> <br />
          <input
            type="text"
            name="newDescription"
            value={newDescription}
            onChange={handleInput}
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: colors.blue }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Description;
