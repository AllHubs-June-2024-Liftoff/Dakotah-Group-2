import React from "react";
import ProfilePicture from "./users/Data/ProfilePicture";
import FavoritesList from "./users/Data/FavoritesList";
import TBRList from "./users/Data/TBRList";
import ClubList from "./users/Data/ClubList";

export default function Profile({ darkMode }) {
  return (
    <>
      <ProfilePicture />
      <FavoritesList />
      <ClubList darkMode={darkMode} />
      <TBRList darkMode={darkMode} />
    </>
  );
}
