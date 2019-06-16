# React Todo
React Todo front-end client that consumes the API provided [Spring Todo Application](update-link-here).
This project was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
and changed to use Material-UI components using React Hooks.

### Features
* User Authentication
* User account creation
* Todo CRUD
* Search Todo
* Mobile friendly UI 

### How to run application

```yaml
git clone {repo}
cd react-to-do
npm install
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Running `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### Improvements
* First time building a React App with Hooks. I'm imagine there are areas of the code that do
not follow conventions.
* User CRUD actions makes an additional call to re-fetch all todos to refresh listing instead
of just affecting state.
* Likely do not need to have a global state for todos if hooks were used correctly 


### Reference Documentation
* [State Management with React Hooks](https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)
* [React Hooks Tutorial for Beginners](https://www.valentinog.com/blog/hooks/)
* [Manage global state with React Hooks](https://medium.com/@Charles_Stover/manage-global-state-with-react-hooks-6065041b55b4)
* [Material-UI](https://material-ui.com/)

### Authors:
Kevin Fan ([KevFan](https://github.com/KevFan))

### Version/Date:
16th June 2019