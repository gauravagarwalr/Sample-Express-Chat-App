import React from "react"; //eslint-disable-line no-unused-vars
import {Route, DefaultRoute} from "react-router"; // Redirect

import Layout from "./layout";

import ProfileComponent from "./users/profile_component";

const routes = (
  <Route name="layout" path="/" handler={Layout}>
    <DefaultRoute handler={ProfileComponent}/>
  </Route>
);

// <Redirect from="" to="/profile"/>

export default routes;
