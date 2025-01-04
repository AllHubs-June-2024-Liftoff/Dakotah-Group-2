import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Club = () => {
    const [club, setClub] = useState({});

    const clubId = sessionStorage.getItem("clubId");

    const getClub = async () => {
        const response = await axios.get(`http://localhost:8080/club/${clubId}`);
        setClub(response.data);
    };

    useEffect(() => {
        getClub();
    }, []);

    return (
        <div>
            <h2>{club.name}</h2>
            <div>{club.bookOfTheMonth == null ? "No book set yet!" : club.bookOfTheMonth}</div>
            <div>
                <p>{club.description == null ? "No description added!" : club.description}</p>
            </div>
            <div>
                <ul>{club.members != null ? club.members.map((user) => <il>{user.name}</il>) : " "}</ul>
            </div>
        </div>
    );
};

export default Club;
