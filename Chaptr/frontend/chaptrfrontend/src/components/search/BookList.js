import React from "react";
import BookCard from "./BookCard";

export default function BookList(props){
    return (
        <div className="list">
            <h2>Book List</h2>          
           {
            props.books.map((book, i) => {
                return <BookCard 
                            key={i}
                            image={book.volumeInfo.imageLinks.thumbnail}
                            title={book.volumeInfo.title}
                            author={book.volumeInfo.authors}
                            publishedDate={book.volumeInfo.publishedDate}
                        />
            })
           }
        </div>
    );

}