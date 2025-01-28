import React from "react";
import Books from "./Books";

export default function SearchTBR() {
    return (
        <div>
            <div className="tbr-logo-title">
                {/*book logo */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                <path d="M96 32C43 32 0 75 0 128V384C0 437 43 480 96 480H448V32H96zM384 384H96C69.5 384 48 362.5 48 336S69.5 288 96 288H384V384z" fill="currentColor"/>
                </svg>
                <h1>Add to TBR</h1>
            </div>
           
            <Books />
        </div>
    );
}
