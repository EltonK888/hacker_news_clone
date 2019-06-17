import React, { useState, useEffect } from 'react'
import { Story } from "./story"
import { getStory, getHumanTime, URL, PRTY } from "../helpers"
import LoadingSpinner from "./loadingSpinner";

/* Component to load a User containing their name, about me, and posts */
const User = (props) => {

    const [user, setUser] = useState(null); // store information about the user
    const [loaded, setLoaded] = useState(false);
    const [stories, setStories] = useState([]); // the stories that the user has posted

    useEffect(() => {
        let userPromise = userInfo();
        userPromise.then(u => {
            setUser(u);
            let storyIds = u.submitted.splice(0,50);
            console.log(storyIds)
            let promArray = [];
            storyIds.forEach(id => {
                promArray.push(getStory(id));
            })
            Promise.all(promArray)
            .then(promRes => {
                promRes.forEach(i => stories.push(i));
                console.log(stories);
                setStories(stories);
                setLoaded(true);
            })
        })
    }, [])

    /* Return a Promise containing information about the user given in the url */
    const userInfo = async () => {
        let response = await fetch(`${URL}/user/${props.match.params.id}${PRTY}`)
        let userPromise = response.json();
        return userPromise;
    }

    /* Renders the User id, about, and their posts to the page */
    const loadUser = () => {
        if (!loaded) {
            return (
                <LoadingSpinner/>
            )
        } else {
            let storiesComponents = stories.map(story => story.type === "story" && !story.deleted && !story.dead? <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url} points={story.score} darkMode={props.darkMode}/> : null).filter(story => story !== null);
            return (
                <div>
                    <h2 className={props.darkMode ? "dark-mode-text" : ""}>{user.id}</h2>
                    <p className="storyDetails">Joined <b>{getHumanTime(user.created)}</b> has <b>{user.karma}</b> karma</p>
                    <p className={props.darkMode ? "aboutUser dark-mode-text" : "aboutUser"} dangerouslySetInnerHTML={{__html: user.about}}></p>
                    <h3 className={props.darkMode ? "dark-mode-text" : ""}>Posts</h3>
                    {stories.length === 0 ? <p>This user has not posted yet</p> : storiesComponents}
                </div>
            )
        }
    }

    return (
        loadUser()
    )
}

export default User;
