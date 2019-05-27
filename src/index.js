import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Topstories from "./topStories";
import "bootstrap/dist/css/bootstrap.css"
import "./main.css"
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from "react-router-dom"
import User from "./components/user";
import Post from "./post"

const obj = {
    topstoryIds: null
}


export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <h1 style={{textAlign: "center"}}><Link to="/" style={{color: "black"}}>Hacker News</Link></h1>
                    <h3><Link to="/">Top</Link> New</h3>
                    <Route path="/" exact component={Topstories}/>
                    <Route path="/user/:id" exact component={User}/>
                    <Route path="/post/:id" exact component={Post}/>
                </Router>
            </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById("root"));