import React, { useState } from "react";
import SearchArea from "./SearchArea";
import BookList from "./BookList";


export default function Books(){

    const [books, setBooks] = useState([]);
    const [searchField, setSearchField] = useState("");
    

    const searchBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchField}`)
            const data = await response.json();
            console.log(data);
            console.log("--------- DATA UP HERE! ---------");
            setBooks(data.items || [] );
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleSearch = (e) => {
        setSearchField(e.target.value);
    }

    return (
        <div className="books">
            <SearchArea handleSearch={handleSearch} searchBook={searchBook} />
            <h3>Books</h3>
            <BookList books={books} />
        </div>
    );

}