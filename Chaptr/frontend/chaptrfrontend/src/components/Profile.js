import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Profile() {
    return(
        <div>
            <h1>User Profile</h1>
    
            <Button
            variant="contained"
            component={Link}
            sx={{
              marginRight: 2,
              backgroundColor: "#92B9BD",
            }}
            to="/SearchTBR">
            Add book to TBR
          </Button>
        </div>
    );
}