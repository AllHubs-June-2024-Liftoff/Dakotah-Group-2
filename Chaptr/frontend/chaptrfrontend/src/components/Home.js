import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching users.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="alert alert-info" role="alert">
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="py-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Full Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.image}</td>
                <td>{user.name}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-2"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success mx-2"
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
