import React, { useState, useEffect } from 'react';
import Comment from "./components/comment";
import { getStory, getHumanTime } from "./helpers";
import { Story } from "./components/story"
import LoadingSpinner from "./components/loadingSpinner";

/* The component for individual posts when user wants to see comments of a post */
const Post = (props) => {

    const [story, setStory] = useState(null); // to store the information of the story
    const [loaded, setLoaded] = useState(false);
    const [comments, setComments] = useState([]); // to store the information of all the comments

    useEffect(() => {
        let prom = getStory(props.match.params.id)
        prom.then(c => {
            console.log(c)
            setStory(c);
            let commentArray = c.kids;
            let promArray = []
            if (c.descendants !== 0) {
                commentArray.forEach(cId => {
                    promArray.push(getStory(cId));
                })
            }
            Promise.all(promArray)
            .then(promRes =>{
                promRes.forEach(i => comments.push(i));
                setComments(comments);
                setLoaded(true);
            })
        })
    }, [])
    
    /* method that renders the Post and its comments */
    const loadPost = () => {
        if (loaded){
            if (comments.length === 0) {
                return (
                    <div>
                        <Story 
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            by={story.by}
                            time={getHumanTime(story.time)}
                            numComments={story.descendants}
                            titleLink={story.url}
                            points={story.score}
                            darkMode={props.darkMode}
                        />
                        <p>There are no comments</p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Story
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            by={story.by}
                            time={getHumanTime(story.time)}
                            numComments={story.descendants}
                            titleLink={story.url}
                            points={story.score}
                            darkMode={props.darkMode}
                        />
                        {comments.map(c => c.type === "comment" && !c.deleted && !c.dead ? <Comment key={c.id} text={c.text} time={c.time} by={c.by} darkMode={props.darkMode}/> : "")}
                    </div>
                )
            }
        } else {
            return (
                <LoadingSpinner/>
            )
        }
    }
    return (
        loadPost()
    )
}

export default Post;