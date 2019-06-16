import React from 'react'
import Login from "./component/Login";
import TodoListing from "./component/TodoListing";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "./component/SignUp";
import CustomSnackbar from "./component/CustomSnackBar";
import "./css/App.css";
import {HOME, LOGIN, SIGNUP} from "./constants/RouterRoutes";

function App() {
  return (
      <div>
        <Router>
          <Route exact path={LOGIN} component={Login}/>
          <Route exact path={SIGNUP} component={SignUp}/>
          <Route exact path={HOME} component={TodoListing}/>
        </Router>
        <CustomSnackbar/>
      </div>
  );
}

export default App;
