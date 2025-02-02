import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClubList from "./UserLists/ClubList";
import FavoritesList from "./UserLists/FavoritesList";
import TBRList from "./UserLists/TBRList";
import ProfilePicture from "./UserLists/ProfilePicture";

export default function UserProfile({ darkMode }) {
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getUserProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/getUserProfile/${id}`
          );
          setUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching owner data:", error);
        }
      };

      getUserProfile();
    }
  }, [id]);

  if (!userProfile) {
    return <div>Loading owner data...</div>;
  }

  return (
    <>
      <ProfilePicture user={userProfile} />
      <FavoritesList user={userProfile} />
      <ClubList user={userProfile} />
      <TBRList darkMode={darkMode} user={userProfile} />
    </>
  );
}
