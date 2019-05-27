import React, { Component } from 'react'
import { Story } from "./story"
import { loadPartialConfig } from '@babel/core';
import { getStory, getHumanTime, URL, PRTY } from "../hackerApi"

export default class User extends Component {
    state = {
        user: null,
        loaded: false,
        stories: []
    }
    async componentDidMount() {
        let userObj = this.userInfo();
        userObj.then(c => {
            this.state.user = c;
            let storyIds = c.submitted.splice(0,50);
            console.log(storyIds)
            let promArray = [];
            storyIds.forEach(id => {
                promArray.push(getStory(id));
            })
            Promise.all(promArray)
            .then(promRes => {
                promRes.forEach(i => this.state.stories.push(i));
                console.log(this.state.stories);
                this.setState({user: this.state.user, loaded: true, stories: this.state.stories})
            })
        })
    }
    async userInfo () {
        let response = await fetch(`${URL}/user/${this.props.match.params.id}${PRTY}`)
        let obj = response.json();
        let userObj = obj.then(c => c);
        return userObj;
    }

    loadUser() {
        if (!this.state.loaded) {
            return (
                <div>
                    <h3 className="loading">loading...</h3>
                </div>
            )
        } else {
            let stories = this.state.stories.map(story => story.type === "story" && !story.deleted && !story.dead? <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url}/> : null).filter(story => story !== null);
            return (
                <div>
                    <h2>{this.state.user.id}</h2>
                    <p className="storyDetails">Joined <b>{getHumanTime(this.state.user.created)}</b> has <b>{this.state.user.karma}</b> karma</p>
                    <p dangerouslySetInnerHTML={{__html: this.state.user.about}}></p>
                    <br/>
                    <h3>Posts</h3>
                    {stories.length === 0 ? <p>This user has not posted yet</p> : stories}
                </div>
            )
        }
    }

    render() {
        return (
            this.loadUser()
        )
    }
}
