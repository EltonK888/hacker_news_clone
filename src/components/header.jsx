import React from "react";
import { Link, NavLink } from  "react-router-dom"

/* Header that includes links to the top/new stories that shows on every page */
export default function Header(props) {
    return (
        <div className="header">
            <h1 className={props.darkMode ? "dark-mode-hackerNews" : "hackerNews"}><Link to="/" className={props.darkMode ? "dark-mode-hackerNews": "hackerNews"}>Hacker News</Link></h1>
            <h3><NavLink to="/" exact activeStyle={{color: "rgb(185, 56, 56)", textDecoration: "underline"}} className={props.darkMode ?  "dark-mode-topNew" : "topNew"}>Top</NavLink> <NavLink to="/new" activeStyle={{color: "rgb(185, 56, 56)", textDecoration: "underline"}} className={props.darkMode ? "dark-mode-topNew" : "topNew"}>New</NavLink></h3>
        </div>
    )
}
