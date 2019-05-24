import React, { Component } from 'react'
import { Story } from "./components/story"
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from "react-router-dom"

const url = "https://hacker-news.firebaseio.com/v0";
const prty = ".json?print=pretty";

export default class Topstories extends Component {
    state = {
        stories: [],
        loaded: false
    }
    async componentDidMount() {
        const top = await fetch(`${url}/topstories${prty}`);
        const response = await top.json();
        console.log(response);
        let promArray = []
        response.splice(0,50).forEach(id => {
            promArray.push(this.getStory(id));
        });
        console.log(promArray)
        Promise.all(promArray)
        .then(promRes => {
            promRes.forEach(i => this.state.stories.push(i));
            this.setState({stories: this.state.stories, loaded: true});
        })
        /*
        const a = await response.splice(0,50).map(c => fetch(`${url}/item/${c}${prty}`));
        const aa = await a.map(promise => {
            promise.then(c => c.json()).then(d => {
                this.state.stories = d.title
                this.setState({stories: this.state.stories, loaded: true})
            })
        });
        await setTimeout(console.log(aa[0]), 1000);
        */
    }

    async getStory(id) {
        const response = await fetch(`${url}/item/${id}${prty}`);
        let b = response.json();
        let d = b.then(c => {
            return c;
        })
        console.log(d);
        return d;
    }

    getHumanTime(unixTime) {
        let date = new Date(unixTime*1000);
        let month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
        let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        let year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : `${date.getFullYear()}`;
        let hours = date.getHours() == 0 ? `12` : date.getHours() <= 12 ? `${date.getHours()}` : `${date.getHours()-12}`;
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        let amPM = date.getHours() >= 12 ? "PM" : "AM"
        return `${month}/${day}/${year}, ${hours}:${minutes} ${amPM}`
    }
    render() {
        const topStories = this.state.stories.map(story => <Story key={story.id} id={story.id} title={story.title} by={story.by} time={this.getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url}/>)
        return (
            <div>
                {this.state.loaded ? topStories : <h3>loading..</h3>}
            </div>
        )
    }
}
