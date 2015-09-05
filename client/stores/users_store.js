import lodash from "lodash";
import Immutable, {Map} from "immutable";
import request from "superagent-bluebird-promise";

import appState from "./app_state";

var User = {
  fetchCurrentUser: () => {
    return request.get("/current_user").promise().then((response) => {
      appState.cursor(["state", "currentUser"]).update(() => Immutable.fromJS(response.body.user));
      appState.cursor(["state", "csrfToken"]).update(() => response.body.csrfToken);
    });
  },

  fetchUsers: () => {
    return request.get("/users").promise().then((response) => {
      var users = lodash.reduce(response.body.users, (memo, userJson) => {
        return memo.set(String(userJson._id), Immutable.fromJS(userJson));
      }, Map());

      appState.cursor(["state", "users"]).update(() => users);
    });
  },

  getCurrentUser: () => {
    return appState.cursor(["state", "currentUser"]).deref();
  },

  getUsers: () => {
    var currentUser = User.getCurrentUser();
    var currentUserId = User.id(currentUser);

    return appState.cursor(["state", "users"]).filterNot((user, userId) => {
      return userId === currentUserId;
    });
  },

  getUserById: (id) => {
    return appState.cursor(["state", "users", id]).deref();
  },

  id: (user) => {
    return user.get("_id");
  },

  name: (user) => {
    return user.get("name");
  },

  username: (user) => {
    return user.get("username");
  },

  photoUrl: (user) => {
    return user.get("photoUrl");
  },

  phone: (user) => {
    return user.get("phone");
  }
};

export default User;
