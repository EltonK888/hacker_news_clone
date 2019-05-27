import React, { Component } from 'react'
import { Story } from "./components/story"
import { getHumanTime, loadStories } from "./hackerApi"


export default class Stories extends Component {
    state = {
        stories: [],
        loaded: false
    }

    async componentDidMount() {
        let type;
        if (this.props.match.params.type === "new") {
            type = "newstories";
        } else {
            type = "topstories";
        }
        loadStories(type, this);
    }

    render() {
        const topStories = this.state.stories.map(story => <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url}/>)
        return (
            <div>
                {this.state.loaded ? topStories : <h3 style={{textAlign: "center"}}>loading..</h3>}
            </div>
        )
    }
}
