import React, { useEffect /* useState */ } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"

export default function Profile() {
  /* const [book, setBook] = useState({
    name: "",
    author: "",
    book_cover: "",
    publication_date: "",
  }); */

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/Chaptr");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  /* const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/tbr", book);
    setBook({ ...book, [e.target.name]: e.target.value });
    navigate("/Profile");
  }; */

  return (
    <div>
      <h1>{`${user.name}'s profile`}</h1>

      <Button
        /* onClick={(e) => onSubmit(e)} */
        /* type="submit" */
        /* value={book} */
        variant="contained"
        component={Link}
        sx={{
          marginRight: 2,
          backgroundColor: "#92B9BD",
        }}
        to="/SearchTBR"
      >
        Add book to TBR
      </Button>
    </div>
  );
}
