import React from "react";
import { Link, NavLink } from  "react-router-dom"

/* Header that includes links to the top/new stories that shows on every page */
export default function Header() {
    return (
        <div className="header">
            <h1 style={{textAlign: "center"}}><Link to="/" style={{color: "black", textDecoration: "none"}}>Hacker News</Link></h1>
            <h3><NavLink to="/" exact activeStyle={{color: "rgb(185, 56, 56)", textDecoration: "underline"}} className="topNew">Top</NavLink> <NavLink to="/new" activeStyle={{color: "rgb(185, 56, 56)", textDecoration: "underline"}} className="topNew">New</NavLink></h3>
        </div>
    )
}
