import React, { useState } from 'react'
import { Link } from "react-router-dom";

export const Story = (props) => {
    return (
        <div>
            <h5 className="storyTitle"><a className="titleLink" href={props.titleLink}>{props.title}</a></h5>
            <p className="storyDetails">by <Link to={`/user/${props.by}`} className="descriptionLink">{props.by}</Link> on {props.time} with <Link to={`/post/${props.id}`} className="descriptionLink">{props.numComments}</Link> comments</p>
        </div>
    )
}

