# Hacker News Clone
### *View deployed version here:* https://eltonk888.github.io/hacker_news_clone

This project was inspired by Tyler McGinnis https://github.com/tylermcginnis/react-course-curriculum

This is a Hacker News Clone that was created using ReactJS and Bootstrap using the [hacker news API](https://github.com/HackerNews/API) used to make fetch requests to dyanmically generate Top/New stories, posts, comments, and users

## Features
* Users can view Top or New stories
* Stories have meta information displayed such as points, date posted, number of comments
* Users can view information about other users such as their about me page and posts
* Users can view comments about a hacker news story
* Users can switch between light and dark mode using a toggle button on the top for their viewing pleasure

## Screen Shots

| Light Mode | Dark Mode|
|:----:|:----:|
| Light Mode Home Page ![light mode home](https://github.com/EltonK888/hacker_news_clone/blob/master/images/lightModeHome.PNG) | Dark Mode Home Page ![dark mode home](https://github.com/EltonK888/hacker_news_clone/blob/master/images/darkModeHome.PNG) |
| Light Mode Comments ![light mode comments](https://github.com/EltonK888/hacker_news_clone/blob/master/images/lightModeComments.PNG) | Dark Mode Comments ![dark mode comments](https://github.com/EltonK888/hacker_news_clone/blob/master/images/darkModeComments.PNG) |
| Light Mode about User ![light mode user](https://github.com/EltonK888/hacker_news_clone/blob/master/images/lightModeUser.PNG) | Dark Mode about User ![dark mode user](https://github.com/EltonK888/hacker_news_clone/blob/master/images/darkModeUser.PNG) |

## What I learned
* Using the Fetch API to make calls to the Hacker News API to dynamically generate data
* Learning how to use Promises and working with ES6 JavaScript
* React routing using `react-router-dom`
* Creating a dark mode feature using ReactJS and CSS
* Learning that Unix time exists (haha)

## Known issues/Missing Features
* Unable to view nested comments (comments that reply to other comments)
* No pagination to view the next 50 Top/New stories

## To run on a development server locally
Make sure you have `npm`, `NodeJS`, `create-react-app` installed

In the project directory, run:
```bash
npm start
```

and open [localhost:3000](http://localhost:3000) in the browser
