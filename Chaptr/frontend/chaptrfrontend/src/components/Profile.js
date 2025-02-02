import React from "react";
import UpdateProfilePicture from "./users/UpdateData/UpdateProfilePicture";
import UpdateFavoritesList from "./users/UpdateData/UpdateFavoritesList";
import UpdateTBRList from "./users/UpdateData/UpdateTBRList";
import UpdateClubList from "./users/UpdateData/UpdateClubList";

export default function Profile({ darkMode }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <>
      <UpdateProfilePicture user={user} />
      <UpdateFavoritesList user={user} />
      <UpdateClubList darkMode={darkMode} user={user} />
      <UpdateTBRList darkMode={darkMode} user={user} />
    </>
  );
}
