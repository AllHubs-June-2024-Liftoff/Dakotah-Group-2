import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Charactr
          </Link>
          <Link className="btn btn-outline-light" to="/Login">
            Login
          </Link>
          <Link className="btn btn-outline-light" to="/RegisterUser">
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
}
