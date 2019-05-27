import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Stories from "./stories";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./components/user";
import Post from "./post";
import Header from "./components/header";

const App = () => {
    return (
        <div className="container">
            <Router>
                <Header/>
                <Route path="/" exact component={Stories}/>
                <Route path="/:type" exact component={Stories}/>
                <Route path="/user/:id" exact component={User}/>
                <Route path="/post/:id" exact component={Post}/>
            </Router>
        </div>
    )
}




ReactDOM.render(<App/>, document.getElementById("root"));