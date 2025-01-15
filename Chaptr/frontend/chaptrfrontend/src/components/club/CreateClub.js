import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const CreateClub = () => {
    const navigate = useNavigate();

    const [newClub, setNewClub] = useState({
        name: "",
        clubMessage: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClub({
            ...newClub,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClubObject = {
            name: newClub.name,
            clubMessage: newClub.clubMessage,
        };

        await axios.post("http://localhost:8080/club/create", newClubObject);

        navigate("/ClubsList");
    };

    const onCancel = () => {
        navigate("/ClubsList");
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* <div>
                <label>Name</label>
                <input type="text" name="name" value={newClub.name} onChange={handleInputChange} />
            </div> */}
            <div>
                <TextField
                    label="Club Name"
                    name="name"
                    value={newClub.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                    style={{ width: 500 }}
                />
            </div>

            {/* <div>
                <label>Description</label>
                <input type="text" name="clubMessage" value={newClub.clubMessage} onChange={handleInputChange} />
            </div> */}
            <div>
                <TextField
                    label="Club Description"
                    name="clubMessage"
                    value={newClub.clubMessage}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                    style={{ width: 500 }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <Button variant="contained" type="submit" color="primary" sx={{ width: "50%" }}>
                        Submit
                    </Button>
                </div>
                <div>
                    <Button onClick={() => onCancel()} variant="outlined" color="secondary" sx={{ width: "50%" }}>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CreateClub;
