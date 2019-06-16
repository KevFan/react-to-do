import React from 'react'
import Login from "./user/Login";
import TodoHome from "./todo/TodoHome";
import {HashRouter, Route} from "react-router-dom";
import SignUp from "./user/SignUp";
import CustomSnackbar from "./layout/CustomSnackBar";
import "../css/App.css";
import {HOME, LOGIN, SIGNUP} from "../constants/RouterRoutes";

function App() {
  return (
      <div>
        <HashRouter basename='/'>
          <Route exact path={LOGIN} component={Login}/>
          <Route exact path={SIGNUP} component={SignUp}/>
          <Route exact path={HOME} component={TodoHome}/>
        </HashRouter>
        <CustomSnackbar/>
      </div>
  );
}

export default App;
