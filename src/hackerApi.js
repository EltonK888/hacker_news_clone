import { async } from "q";

export const URL= "https://hacker-news.firebaseio.com/v0/";
export const PRTY = ".json?print=pretty";



export async function getStory(id) {
    const response = await fetch(`${URL}/item/${id}${PRTY}`);
    let b = response.json();
    let d = b.then(c => {
        return c;
    })
    return d;
}

export function getHumanTime(unixTime) {
    let date = new Date(unixTime*1000);
    let month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : `${date.getFullYear()}`;
    let hours = date.getHours() == 0 ? `12` : date.getHours() <= 12 ? `${date.getHours()}` : `${date.getHours()-12}`;
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    let amPM = date.getHours() >= 12 ? "PM" : "AM"
    return `${month}/${day}/${year}, ${hours}:${minutes} ${amPM}`
}


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
        promRes.forEach(i => that.state.stories.push(i));
        that.setState({stories: that.state.stories, loaded: true});
    })
}