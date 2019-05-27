import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Stories from "./Stories";
import "bootstrap/dist/css/bootstrap.css"
import "./main.css"
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from "react-router-dom"
import User from "./components/user";
import Post from "./post"
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <h1 style={{textAlign: "center"}}><Link to="/" style={{color: "black", textDecoration: "none"}}>Hacker News</Link></h1>
                    <h3><NavLink to="/" exact activeStyle={{color: "rgb(185, 56, 56)"}} className="topNew">Top</NavLink> <NavLink to="/new" activeStyle={{color: "rgb(185, 56, 56)"}} className="topNew">New</NavLink></h3>
                    <Route path="/" exact component={Stories}/>
                    <Route path="/:type" exact component={Stories}/>
                    <Route path="/user/:id" exact component={User}/>
                    <Route path="/post/:id" exact component={Post}/>
                </Router>
            </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById("root"));