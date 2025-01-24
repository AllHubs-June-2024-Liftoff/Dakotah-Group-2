import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProfileOwner({ darkMode }) {
  const [owner, setOwner] = useState(null);
  const [tbr, setTbr] = useState({ tbr: [] });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getProfileOwner = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/owner/${id}`);
          setOwner(response.data);
          if (response.data.email) {
            loadTBRLists(response.data.email);
          }
        } catch (error) {
          console.error("Error fetching owner data:", error);
        }
      };

      getProfileOwner();
    }
  }, [id]);

  const loadTBRLists = async (userEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tbr/email/${userEmail}`
      );
      setTbr(response.data);
    } catch (error) {
      console.error("Error fetching TBR Lists:", error);
    }
  };

  if (!owner) {
    return <div>Loading owner data...</div>;
  }

  return (
    <div>
      <p>{`${owner.firstName + " " + owner.lastName}'s profile`}</p>
      <div>
        <img
          src={owner.userImage || "path/to/default/image.jpg"}
          alt={owner.firstName}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </div>
      <div>
        <h1>{tbr.name || "My TBR List"}</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: darkMode ? "#e0e0e0" : "#333",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: darkMode ? "#121212" : "#f5f5f5" }}>
              <th
                style={{
                  padding: "10px",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "10px",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                }}
              >
                Cover
              </th>
              <th
                style={{
                  padding: "10px",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                }}
              >
                Author
              </th>
              <th
                style={{
                  padding: "10px",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                }}
              >
                Publication Date
              </th>
            </tr>
          </thead>
          <tbody>
            {tbr.tbr.length > 0 ? (
              tbr.tbr.map((book) => (
                <tr
                  key={book.id}
                  style={{
                    backgroundColor: darkMode ? "#333" : "#fafafa",
                  }}
                >
                  <td
                    style={{
                      padding: "8px",
                      border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                    }}
                  >
                    {book.name}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                    }}
                  >
                    <img src={book.bookCover} alt={book.name} width="50" />
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                    }}
                  >
                    {Array.isArray(book.author)
                      ? book.author.join(", ")
                      : book.author}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                    }}
                  >
                    {book.publicationDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                  }}
                >
                  No books in TBR
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
