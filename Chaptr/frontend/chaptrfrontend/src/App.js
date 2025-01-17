import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Chaptr from "./components/Chaptr";
import Profile from "./components/Profile";
import SearchTBR from "./components/search/SearchTBR";
import Register from "./components/users/Register";
import EditUser from "./components/users/EditUser";
import Club from "./components/club/Club";
import ClubsList from "./components/club/ClubsList";
import CreateClub from "./components/club/CreateClub";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
                        <Route path="/" element={<Navigate to="/Chaptr" />} />
                        <Route path="/Chaptr" element={<Chaptr darkMode={darkMode} />} />
                        <Route path="/Profile" element={<Profile darkMode={darkMode} />} />
                        <Route path="/EditUser" element={<EditUser darkMode={darkMode} />} />
                        <Route path="/SearchTBR" element={<SearchTBR darkMode={darkMode} />} />
                        <Route path="/Register" element={<Register darkMode={darkMode} />} />
                        <Route path="/ClubsList" element={<ClubsList darkMode={darkMode} />} />
                        <Route path="/Club" element={<Club darkMode={darkMode} />} />
                        <Route path="/CreateClub" element={<CreateClub darkMode={darkMode} />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
