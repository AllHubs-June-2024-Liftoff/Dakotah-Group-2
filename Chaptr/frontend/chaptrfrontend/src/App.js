import "./App.css";
// import from '@mui/material';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import EditUser from "./components/users/EditUser";
import ViewUser from "./components/users/View";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegisterUser" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
