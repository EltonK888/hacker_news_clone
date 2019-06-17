import React from 'react';
import { Link, NavLink } from "react-router-dom";
import DarkModeSwitch from "./darkmodeswitch";

/* Navbar that contains the darkmode switch, and links to top/new stories */
export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar bg-dark fixed-top navbar-expand">
                <div className="container">
                    <span className={props.darkMode ? "navbar-brand mb-0 h1 dark-mode-hackerNews" : "navbar-brand mb-0 h1 hackerNewsBrand"}><Link to="/" className={props.darkMode ? "dark-mode-hackerNews": "hackerNewsBrand"}>HN</Link></span>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mr-3">
                            <h4><NavLink to="/" exact activeStyle={{color: "rgb(185, 56, 56)", textDecoration: "underline"}} className="dark-mode-topNew">Top</NavLink></h4>
                        </li>
                        <li className="nav-item">
                            <h4><NavLink to="/new" activeStyle={{color: "rgb(185, 56, 56)", textDecoration: "underline"}} className="dark-mode-topNew">New</NavLink></h4>
                        </li>
                    </ul>
                    <DarkModeSwitch darkMode={props.darkMode} themeChange={props.themeChange}/>
                </div>
            </nav> 
        </div>
    )
}
