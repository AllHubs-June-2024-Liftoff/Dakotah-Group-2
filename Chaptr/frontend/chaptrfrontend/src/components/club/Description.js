import axios from "axios";
import React, { useState } from "react";

const Description = ({ clubId, onRefresh, hideDescription }) => {
    const [newDescription, setNewDescription] = useState("");

    const submitDescription = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/club/${clubId}/description/${newDescription}`);
        hideDescription(false);
        onRefresh();
    };

    const handleInput = (e) => {
        e.preventDefault();
        setNewDescription(e.target.value);
        console.log(newDescription);
    };

    return (
        <form onSubmit={submitDescription}>
            <div>
                <label>Update Description</label>
                <input type="text" name="newDescription" value={newDescription} onChange={handleInput} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Description;
