import React from "react";
import { Link } from  "react-router-dom"

/* Header of the Top/New stories */
export default function Header(props) {
    return (
        <div className="header">
            <h1 className={props.darkMode ? "dark-mode-hackerNews" : "hackerNews"}><Link to="/" className={props.darkMode ? "dark-mode-hackerNews": "hackerNews"}>Hacker News</Link></h1>
        </div>
    )
}
