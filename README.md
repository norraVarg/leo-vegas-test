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
  - line 28: No need to use `<foot>` tag to wrap a button. [Ref](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
