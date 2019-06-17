import React, { useState, useEffect } from "react"
import { HashRouter as Router, Route } from "react-router-dom";
import User from "./components/user";
import Post from "./post";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Stories from "./stories";

const App = () => {

    const getInitialTheme = () => {
        const theme = JSON.parse(localStorage.getItem("dark"));
        return theme || false;
    }

    const [darkMode, setDarkMode] = useState(() => getInitialTheme());

    useEffect(() => {
        if (darkMode) {
            document.body.style.backgroundColor = "#1a1919";
        } else {
            document.body.style.backgroundColor = "#e4e4e4";
        }
    }, [darkMode])


    /* Change between darkmode and light mode */
    const handleThemeChange = () => {
        if (darkMode) {
            document.body.style.backgroundColor = "#e4e4e4";
            document.body.style.transition = "0.25s ease-in-out"
        } else {
            document.body.style.backgroundColor = "#1a1919";
            document.body.style.transition = "0.25s ease-in-out"
        }
        setDarkMode(!darkMode);
        /* Saves dark mode between refreshes and different sessions */
        localStorage.setItem("dark", JSON.stringify(!darkMode))
    }
    return (
            <div className={darkMode ? "dark-mode" : "light-mode"}>
                <Router basename="/">
                <Navbar darkMode={darkMode} themeChange={() => handleThemeChange()}/>
                <div className="container">
                        <Header darkMode={darkMode}/>
                        <Route path="/" exact render={(props) => <Stories {...props} darkMode={darkMode}/>}/>
                        <Route path="/:type" exact render={(props) => <Stories {...props} darkMode={darkMode}/>}/>
                        <Route path="/user/:id" exact render={(props) => <User {...props} darkMode={darkMode}/>}/>
                        <Route path="/post/:id" exact render={(props) => <Post {...props} darkMode={darkMode}/>}/>
                </div>
                </Router>
            </div>
    )
}

export default App;