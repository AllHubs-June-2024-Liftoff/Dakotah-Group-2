import React, { useState } from "react";
import SearchArea from "./SearchArea";

export default function Books(){

    const [books, setBooks] = useState([]);
    const [searchField, setSearchField] = useState("");
    

    const handleSearch = (e) => {
        setSearchField(e.target.value);
    }

    return (
        <div className="books">
            <SearchArea handleSearch={handleSearch}/>
            <h3>Books</h3>
        </div>
    );

}