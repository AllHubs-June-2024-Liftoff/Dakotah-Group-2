import React from "react";

export default function Login() {
  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <div class="row">
        <form className="col-md offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type={"email"}
              className="form-control"
              placeholder="Enter your email address"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={"password"}
              className="form-control"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}