import React from "react";

export default function BookCard(props){
    return (
        <div className="card-container">
            <img src={props.image} alt="book cover"></img>
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{Array.isArray(props.author) ? props.author.join(", ") : props.author}</h3>
                <p>{props.publishedDate === '0000' ? 'Not available' : props.publishedDate.substring(0,4)}</p>
            </div>
            <button>Add to TBR</button>
        </div>
    );

}