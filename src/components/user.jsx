import React, { Component } from 'react'
import { Story } from "./story"
import { getStory, getHumanTime, URL, PRTY } from "../helpers"

/* Component to load a User containing their name, about me, and posts */
export default class User extends Component {
    state = {
        user: null,
        loaded: false,
        stories: []
    }
    async componentDidMount() {
        let userPromise = this.userInfo();
        userPromise.then(c => {
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

    /* Return a Promise containing information about the user given in the url */
    async userInfo () {
        let response = await fetch(`${URL}/user/${this.props.match.params.id}${PRTY}`)
        let userPromise = response.json();
        return userPromise;
    }

    /* Renders the User id, about, and their posts to the page */
    loadUser() {
        if (!this.state.loaded) {
            return (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            let stories = this.state.stories.map(story => story.type === "story" && !story.deleted && !story.dead? <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url} points={story.score} darkMode={this.props.darkMode}/> : null).filter(story => story !== null);
            return (
                <div>
                    <h2 className={this.props.darkMode ? "dark-mode-text" : ""}>{this.state.user.id}</h2>
                    <p className="storyDetails">Joined <b>{getHumanTime(this.state.user.created)}</b> has <b>{this.state.user.karma}</b> karma</p>
                    <p className={this.props.darkMode ? "aboutUser dark-mode-text" : "aboutUser"} dangerouslySetInnerHTML={{__html: this.state.user.about}}></p>
                    <h3 className={this.props.darkMode ? "dark-mode-text" : ""}>Posts</h3>
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
