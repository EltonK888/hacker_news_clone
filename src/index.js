import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import Stories from "./stories";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";
import { HashRouter as Router, Route } from "react-router-dom";
import User from "./components/user";
import Post from "./post";
import Header from "./components/header";
import Navbar from "./components/navbar";

class App extends Component {
    state = {
        darkMode: this.getInitialTheme()
    }
    componentWillMount() {
        if (this.state.darkMode) {
            document.body.style.backgroundColor = "#1a1919";
        } else {
            document.body.style.backgroundColor = "#e4e4e4";
        }
    }
    /* Saves dark mode between refreshes and different sessions */
    componentDidUpdate() {
        localStorage.setItem("dark", JSON.stringify(this.state.darkMode));
    }
    getInitialTheme() {
        const theme = JSON.parse(localStorage.getItem("dark"));
        return theme || false;
    }
    /* Change between darkmode and light mode */
    handleThemeChange() {
        if (this.state.darkMode) {
            document.body.style.backgroundColor = "#e4e4e4";
            document.body.style.transition = "0.25s ease-in-out"
        } else {
            document.body.style.backgroundColor = "#1a1919";
            document.body.style.transition = "0.25s ease-in-out"
        }
        this.setState({darkMode: !this.state.darkMode});
    }
    render() {
        const { darkMode } = this.state;
        return (
            <div className={darkMode ? "dark-mode" : "light-mode"}>
                <Router basename="/">
                <Navbar darkMode={darkMode} themeChange={() => this.handleThemeChange()}/>
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
}




ReactDOM.render(<App/>, document.getElementById("root"));