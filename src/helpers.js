import React from 'react'
import { Story } from "./components/story"


export const URL= "https://hacker-news.firebaseio.com/v0/"; // the base URL to make fetch calls to the Hacker News API
export const PRTY = ".json?print=pretty"; // if manually visit the http page, will show the json data nicely formatted. Not necessary but helpful for debugging


/* Returns a promise containing an object with the information of the given story id */
export async function getStory(id) {
    const response = await fetch(`${URL}/item/${id}${PRTY}`);
    let storyPromise = response.json();
    return storyPromise;
}


/* Returns a string containing the time in the 'format: mm/dd/yyyy, hh:mm AM/PM' given the unix based time */
export function getHumanTime(unixTime) {
    let date = new Date(unixTime * 1000);
    let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : `${date.getFullYear()}`;
    let hours = date.getHours() === 0 ? `12` : date.getHours() <= 12 ? `${date.getHours()}` : `${date.getHours() - 12}`;
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    let amPM = date.getHours() >= 12 ? "PM" : "AM"
    return `${month}/${day}/${year}, ${hours}:${minutes} ${amPM}`
}


/* Helper function to load Top/New stories based off type */
export async function loadStories(type, that) {
    const top = await fetch(`${URL}/${type}${PRTY}`);
    const response = await top.json();
    console.log(response);
    let promArray = []
    response.splice(0,50).forEach(id => {
        promArray.push(getStory(id));
    });
    console.log(promArray)
    Promise.all(promArray)
    .then(promRes => {
        promRes.forEach(i => {
            try {
                if (i.type === "story") {
                    that.state.stories.push(i);
                }
            } catch {
                console.log("invalid story type");
            }
        })
        that.setState({stories: that.state.stories, loaded: true});
    })
}

/* Function to create an array of Top/New stories */
export function themeTypeStories(darktheme, that) {
    try {
        return that.state.stories.map(story => <Story key={story.id} id={story.id} title={story.title} by={story.by} time={getHumanTime(story.time)} numComments={story.descendants} titleLink={story.url} points={story.score} darkMode={darktheme}/>)
    }
    catch {
        return <h1 style={{color: darktheme ? "rgb(185,56,56)" : "black"}}>Something went wrong, please reload the page</h1>
    }
}