import React from "react"; //eslint-disable-line no-unused-vars
import {Route, DefaultRoute} from "react-router"; // Redirect

import Layout from "./layout";

import UsersMessageListComponent from "./users/users_message_list_component";
import ProfileComponent from "./users/profile_component";

const routes = (
  <Route name="layout" path="/" handler={Layout}>

    <DefaultRoute handler={UsersMessageListComponent}/>

    <Route name="profile" handler={ProfileComponent}/>
  </Route>
);

// <Redirect from="" to="/profile"/>

export default routes;
