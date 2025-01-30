import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { colors } from "../../styles/ThemeColors";

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

        if (!newClub.name) {
            alert("Club name must not be blank, and should be between 3 and 25 characters!");
            return;
        }

        if (newClub.clubMessage.length > 500) {
            alert("Club description must be less than 500 characters!");
            return;
        }

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
        <div className="create-club-container">
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
                        <Button variant="contained" type="submit" sx={{ width: "50%", backgroundColor: colors.purple }}>
                            Submit
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => onCancel()} variant="contained" sx={{ width: "50%", backgroundColor: colors.pink }}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateClub;
