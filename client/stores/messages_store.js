import lodash from "lodash";
import moment from "moment";
import Immutable, {Map} from "immutable";
import request from "superagent-bluebird-promise";

import appState from "./app_state";
import User from "./users_store";

var Message = {
  fetchMessages: (otherUser, since) => {
    var userId = User.id(otherUser);

    var params = {
      since: (since || moment()).toISOString()
    };

    return request.get(`/users/${userId}/messages`, params).promise().then((response) => {
      var fetchedMessages = lodash.reduce(response.body.messages, (memo, messageJson) => {
        return memo.set(String(messageJson._id), Immutable.fromJS(messageJson));
      }, Map());

      appState.cursor(["state", "users", userId, "messages"]).update((messages) => (messages || Map()).merge(fetchedMessages) );
    });
  },

  sendMessage: (otherUser, messageBody) => {
    var userId = User.id(otherUser);
    var params = {
      body: messageBody
    };

    return request.post(`/users/${userId}/messages`, params).promise();
  },

  getMessages: (otherUser) => {
    return otherUser.get("messages");
  }
};

export default Message;
