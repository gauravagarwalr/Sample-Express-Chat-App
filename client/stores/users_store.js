// import lodash from "lodash";

import Immutable from "immutable";
import request from "superagent-bluebird-promise";

import appState from "./app_state";

var User = {
  getCurrentUser: () => {
    return request.get("/current_user").promise().then((response) => {
      appState.cursor(["state", "currentUser"]).update(() => Immutable.fromJS(response.body.user));
    });
  },

  name: (user) => {
    return user.get("name");
  }
};

export default User;
