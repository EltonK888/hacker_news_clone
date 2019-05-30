import React, { Component } from 'react';
import Comment from "./components/comment";
import { getStory, getHumanTime } from "./helpers";
import { Story } from "./components/story"

/* The component for individual posts when user wants to see comments of a post */
export default class Post extends Component {
    state = {
        story: null, // to store the information of the story
        loaded: false,
        comments: [] // to store the information of all the comments
    }

    async componentDidMount() {
        let prom = getStory(this.props.match.params.id)
        prom.then(c => {
            console.log(c)
            this.state.story = c;
            let commentArray = c.kids;
            let promArray = []
            if (c.descendants !== 0) {
                commentArray.forEach(cId => {
                    promArray.push(getStory(cId));
                })
            }
            Promise.all(promArray)
            .then(promRes =>{
                promRes.forEach(i => this.state.comments.push(i));
                this.setState({story: this.state.story, loaded: true, comments: this.state.comments});
            })
        })
    }
    
    /* method that renders the Post and its comments */
    loadPost() {
        if (this.state.loaded){
            let {story, comments} = this.state;
            if (comments.length === 0) {
                return (
                    <div>
                        <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url} points={story.score} darkMode={this.props.darkMode}/>
                        <p>There are no comments</p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url} points={story.score} darkMode={this.props.darkMode}/>
                        {comments.map(c => c.type === "comment" && !c.deleted && !c.dead ? <Comment key={c.id} text={c.text} time={c.time} by={c.by} darkMode={this.props.darkMode}/> : "")}
                    </div>
                )
            }
        } else {
            return (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            this.loadPost()
        )
    }
}
