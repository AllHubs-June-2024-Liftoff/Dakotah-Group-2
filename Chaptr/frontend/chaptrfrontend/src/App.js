import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import EditUser from "./components/users/EditUser";
import ViewUser from "./components/users/View";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route
              path="/Register"
              element={<Register darkMode={darkMode} />}
            />
            <Route path="/Login" element={<Login darkMode={darkMode} />} />
            <Route
              path="/EditUser"
              element={<EditUser darkMode={darkMode} />}
            />
            <Route path="/View" element={<ViewUser darkMode={darkMode} />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
