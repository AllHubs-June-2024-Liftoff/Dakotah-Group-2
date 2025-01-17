import React from "react";
import Login from "../components/users/Login";
import { useNavigate } from "react-router-dom";

export default function Chaptr({ darkMode }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    navigate("/Profile");
  }

  return (
    <div>
      <h1>Welcome to Chaptr</h1>
      <Login darkMode={darkMode} />
    </div>
  );
}
