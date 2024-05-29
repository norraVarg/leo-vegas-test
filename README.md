# Movieland 

React + Redux + RTK + Bootstrap application that fetches movies from [https://www.themoviedb.org/](https://www.themoviedb.org/)

Created with [Create React App](https://github.com/facebook/create-react-app).

## Code Review
- constants.js
  - line 3 and line 4: Remove '/' between 'movie' and '?' to solve 404 issue for the GET request.
- App.js
  - line 21: Set initial state to `null` to reduce the third(unneccessary) state `undefined`
  - line 56: Remove this line since at line 57 `setOpen(true)` is executed anyhow.
- Starred.jsx
  - line 28: No need to use `<footer>` tag to wrap a button. [Ref](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)
- CSS
  - Move component specific stylings to dedicated files to make it easier to reuse/relocate components in the future and easier for future maintaince.
  - Better not nest stylings too much, especially for the default ones that will apply on multiple components.
    - Reason: 1. Hard to overwrite default stylings for individual components when needed. 2. Hard to read for future maintainance.
  - Suggest to adopt mobile-first approach instead of desktop-first.
  - Suggest to create a file for colors to make it easier to modify them accross the entire application in the future.
## Available Scripts

In the project directory, you can run:

### `npm install` (NOTE: node version 19)

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
