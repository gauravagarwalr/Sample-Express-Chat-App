import React from "react"; //eslint-disable-line no-unused-vars
import {Route, DefaultRoute, Redirect} from "react-router";

import Layout from "./layout";

import ProfileComponent from "./users/profile_component";

import SelectUserComponent from "./users/select_user_component";
import UsersMessageListComponent from "./users/users_message_list_component";

import MessagesPane from "./messages/messages_pane";

const routes = (
  <Route name="layout" path="/" handler={Layout}>

    <Route name="users" handler={UsersMessageListComponent}>
      <DefaultRoute handler={SelectUserComponent}/>

      <Route name="messages" path=":userId/messages" handler={MessagesPane}/>
    </Route>

    <Route name="profile" handler={ProfileComponent}/>

    <Redirect from="" to="users"/>
  </Route>
);


export default routes;
