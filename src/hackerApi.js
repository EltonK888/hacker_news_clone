import { async } from "q";

const url = "https://hacker-news.firebaseio.com/v0/";
const prty = ".json?print=pretty";



export async function getStory(id) {
    const response = await fetch(`${url}/item/${id}${prty}`);
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

