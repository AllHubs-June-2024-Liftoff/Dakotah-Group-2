import React, { useState } from "react";
import { Button } from "@mui/material";

export default function BookCard(props) {
    return (
        <div className="card-container">
            <img src={props.image} alt="book cover"></img>
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>{props.publishedDate}</p>
                <Button variant="contained" size="small">
                    Add
                </Button>
            </div>
        </div>
    );
}
