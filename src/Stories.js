import React, { Component } from 'react'
import { Story } from "./components/story"
import { getHumanTime, loadStories } from "./helpers"


/* Component to load the Top/New stories */
export default class Stories extends Component {
    state = {
        stories: [], // Store the stories from fetch call
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
        const topStories = this.state.stories.map(story => <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url} points={story.score}/>)
        return (
            <div>
                {this.state.loaded ? topStories :
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>}
            </div>
        )
    }
}
