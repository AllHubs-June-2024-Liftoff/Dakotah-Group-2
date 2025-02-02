import React from "react";

export default function ProfilePicture({ user }) {
  if (!user) {
    return <div>Loading owner data...</div>;
  }

  return (
    <div className="user-profile-display edit-user-profile-display">
      <img
        src={user.userImage}
        alt={user.firstName}
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <h1>{`${user.firstName + " " + user.lastName}`}</h1>
    </div>
  );
}
