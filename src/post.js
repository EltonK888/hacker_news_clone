import React, { Component } from 'react';
import Comment from "./components/comment";
import { getStory, getHumanTime } from "./hackerApi";
import { Story } from "./components/story"

export default class Post extends Component {
    state = {
        story: null,
        loaded: false,
        comments: []
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
    
    loadPost() {
        if (this.state.loaded){
            let {story, comments} = this.state;
            if (comments.length === 0) {
                return (
                    <div>
                        <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url}/>
                        <h3>There are no comments</h3>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url}/>
                        {comments.map(c => c.type === "comment" && !c.deleted && !c.dead ? <Comment text={c.text} time={c.time} by={c.by}/> : "")}
                    </div>
                )
            }
        } else {
            return <h3 className="loading">loading...</h3>
        }
    }
    render() {
        return (
            this.loadPost()
        )
    }
}
