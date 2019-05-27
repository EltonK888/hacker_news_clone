import React from 'react'
import { Link } from "react-router-dom";
import { getHumanTime } from "../helpers"

/* Component for an individual comment block */
export default function Comment(props) {
    return (
        <div>
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <p className="storyDetails">by <Link to={`/user/${props.by}`} className="descriptionLink">{props.by}</Link> on {getHumanTime(props.time)}</p>
                    <p className="card-text" dangerouslySetInnerHTML={{__html: props.text}}></p>
                </div>
            </div> 
        </div>
    )
}
