import React from "react";
import UpdateProfilePicture from "./users/UpdateData/UpdateProfilePicture";
import UpdateFavoritesList from "./users/UpdateData/UpdateFavoritesList";
import UpdateTBRList from "./users/UpdateData/UpdateTBRList";
import UpdateClubList from "./users/UpdateData/UpdateClubList";

export default function Profile({ darkMode }) {
  return (
    <>
      <UpdateProfilePicture />
      <UpdateFavoritesList />
      <UpdateClubList darkMode={darkMode} />
      <UpdateTBRList darkMode={darkMode} />
    </>
  );
}
