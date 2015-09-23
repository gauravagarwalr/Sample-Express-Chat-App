import React from "react";
import moment from "moment";
import lodash from "lodash";
import Router from "react-router";
import Immutable from "immutable";

import appState from "./stores/app_state";

import routes from "./components/routes";

moment.locale("en", {
  calendar: {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[last] dddd",
    nextWeek: "dddd",
    sameElse: "L"
  }
});

var AppHandler = null;

var render = () => {
  React.render(React.createElement(AppHandler),
    document.getElementById("root"));
};

appState.on("swap", render);

Router.run(routes, (Handler, store) => {
  let routeParams = Immutable.fromJS(store);

  AppHandler = Handler;

  if(!Immutable.is(appState.cursor(["state", "route"]).deref(), routeParams)){
    appState.cursor(["state", "route"]).update(() => routeParams);
  }
});

window.appState = appState;

window.lodash = lodash;
window.moment = moment;
window.Immutable = Immutable;
