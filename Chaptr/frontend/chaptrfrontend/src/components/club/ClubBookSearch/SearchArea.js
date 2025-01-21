import React from "react";

export default function SearchArea(props){
    return (
        <div className="search-area">
            <h2>Search Area</h2>
            <form onSubmit={props.searchBook} action="">
                <input onChange={props.handleSearch} type="text"/>
                <button type="submit">Search</button>
                <select defaultValue="Sort" onChange={props.handleSort}>
                    <option disabled value="Sort">Sort</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </form>
        </div>
    );

}