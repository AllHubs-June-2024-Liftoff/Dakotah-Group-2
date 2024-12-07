import React, { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    pwHash: "",
  });

  const { firstName, lastName, email, location, password, verifyPassword } =
    user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.firstName]: e.target.value });
  };

  /*if (verifyPassword ===  password) {
    setUser.pwHash = password
  }*/

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <div className="row">
        <form className="col-md offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your first name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your last name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type={"email"}
              className="form-control"
              placeholder="Enter your email address"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Mailing Address
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your mailing address"
              name="location"
              value={location}
              onChange={(e) => onInputChange(e)}
            />
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"pwHash"}
                className="form-control"
                placeholder="Enter a strong password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="verifyPassword" className="form-label">
                Verify Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Please verify your password"
                name="verifyPassword"
                value={verifyPassword}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <button type="submit" className="btn btn-outline-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
