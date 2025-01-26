import React from "react";
import Button from "@mui/material/Button";
import { colors } from "../../styles/ThemeColors";

export default function SearchArea(props){
    return (
        <div className="search-area">
                <form onSubmit={props.searchBook} action="">
                <input onChange={props.handleSearch} type="text"/>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: 2, backgroundColor: colors.blue }}
                    >
                    Search
                </Button>
                <select defaultValue="Sort" onChange={props.handleSort}>
                    <option disabled value="Sort">Sort</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </form>
        </div>
    );

}