import React from "react";
import Login from "../components/users/Login";
import { useNavigate } from "react-router-dom";

export default function Chaptr() {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    navigate("/Profile");
  }

  return (
    <div>
      <h1>Welcome to Chaptr</h1>
      <Login />
    </div>
  );
}
