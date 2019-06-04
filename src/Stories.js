import React, { Component } from 'react'
import { loadStories, themeTypeStories } from "./helpers"


/* Component to load the Top/New stories */
export default class Stories extends Component {
    state = {
        stories: [], // Store the stories from fetch call
        loaded: false,
        darkMode: this.props.darkMode,
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
        const topStories = themeTypeStories(this.props.darkMode, this)
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
