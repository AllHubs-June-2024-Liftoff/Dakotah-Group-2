import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles/ThemeColors";

const MembersList = ({ members, joinClub }) => {
  const navigate = useNavigate();

  return (
    <div className="members-container">
      <h1>Club Members</h1>
      {members.length > 0 ? (
        members.map((member) => (
          <Button
            key={member.id}
            onClick={() => navigate(`/ProfileOwner/${member.id}`)}
            variant="contained"
            style={{ backgroundColor: colors.purple }}
          >
            {member.name}
          </Button>
        ))
      ) : (
        <p>No Members!</p>
      )}
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px 0", backgroundColor: colors.purple }}
          onClick={joinClub}
        >
          Join Club
        </Button>
      </div>
    </div>
  );
};

export default MembersList;
