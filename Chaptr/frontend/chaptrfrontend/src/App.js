import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Chaptr from "./components/Chaptr";
import Profile from "./components/Profile";
import Dev from "./components/Dev";
import SearchTBR from "./components/search/SearchTBR";
// import Home from "./components/Home";
import Register from "./components/users/Register";
// import Login from "./components/users/Login";
// import EditUser from "./components/users/EditUser";
// import ViewUser from "./components/users/View";
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
            <Route path="/Chaptr" element={<Chaptr darkMode={darkMode} />} />
            <Route path="/Profile" element={<Profile darkMode={darkMode} />} />
            <Route path="/Dev" element={<Dev darkMode={darkMode} />} />
            <Route
              path="/SearchTBR"
              element={<SearchTBR darkMode={darkMode} />}
            />
            <Route
              path="/Register"
              element={<Register darkMode={darkMode} />}
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
