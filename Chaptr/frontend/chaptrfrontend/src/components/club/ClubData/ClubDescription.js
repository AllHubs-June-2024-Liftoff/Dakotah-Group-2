import React, { useState } from "react";
import { Button } from "@mui/material";
import { colors } from "../../styles/ThemeColors";
import Description from "../Description";

const ClubDescription = ({ club, onDescriptionEdit, darkMode }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="set-desc">
      {showDescription ? (
        <Description
          clubId={club.id}
          onRefresh={onDescriptionEdit}
          hideDescription={() => setShowDescription(false)}
        />
      ) : (
        <p>{club.clubMessage || "No description added!"}</p>
      )}

      {!showDescription ? (
        <Button
          variant="contained"
          sx={{ marginRight: 2, backgroundColor: colors.blue }}
          onClick={() => setShowDescription(true)}
        >
          Edit Description
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ marginRight: 2, backgroundColor: colors.pink }}
          onClick={() => setShowDescription(false)}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default ClubDescription;
