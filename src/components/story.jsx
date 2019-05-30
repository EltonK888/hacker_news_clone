import React from 'react'
import { Link } from "react-router-dom";

/* Component to load an individual story */
export const Story = (props) => {
    function storyThemeType() {
        if (props.darkMode) {
            return (
                <div className="dark-mode-story">
                    <h5 className="storyTitle"><a className="titleLink" href={props.titleLink}>{props.title}</a></h5>
                    <p className="storyDetails">{props.points} points by <Link to={`/user/${props.by}`} className="dark-mode-link">{props.by}</Link> on {props.time} with <Link to={`/post/${props.id}`} className="dark-mode-link">{props.numComments}</Link> comments</p>
                </div>
            )
        } else {
            return (
                <div className="story">
                    <h5 className="storyTitle"><a className="titleLink" href={props.titleLink}>{props.title}</a></h5>
                    <p className="storyDetails">{props.points} points by <Link to={`/user/${props.by}`} className="descriptionLink">{props.by}</Link> on {props.time} with <Link to={`/post/${props.id}`} className="descriptionLink">{props.numComments}</Link> comments</p>
                </div>
            )
        }
    }
    return (
        storyThemeType()
    )
}
