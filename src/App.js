import React from 'react'
import Login from "./component/Login";
import TodoListing from "./component/TodoListing";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "./component/SignUp";

function App() {
  return (
      <div>
        <Router>
          <Route exact path="/" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/todo" component={TodoListing}/>
        </Router>
      </div>
  );
}

export default App;
