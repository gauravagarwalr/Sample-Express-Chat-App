import lodash from "lodash";
import moment from "moment";
import Immutable, {Map} from "immutable";
import request from "superagent-bluebird-promise";

import appState from "./app_state";
import User from "./users_store";

var Message = {
  fetchMessages: (otherUser) => {
    var userId = User.id(otherUser);

    var params = {};

    var lastMessage = Message.getLastMessage(otherUser);

    if(lastMessage && !lastMessage.isEmpty()) {
      params.since = Message.getTime(lastMessage).toISOString();
    }

    return request.get(`/user/${userId}/messages`).query(params).promise().then((response) => {
      var fetchedMessages = lodash.reduce(response.body.messages, (memo, messageJson) => {
        return memo.set(String(messageJson._id), Immutable.fromJS(messageJson));
      }, Map());

      appState.cursor(["state", "users", userId, "messages"]).update((messages) => (messages || Map()).merge(fetchedMessages) );
    });
  },

  sendMessage: (otherUser, messageBody) => {
    var userId = User.id(otherUser);

    var params = {
      _csrf: appState.cursor(["state", "csrfToken"]).deref(),
      body: messageBody
    };

    return request.post(`/user/${userId}/messages`).send(params).promise().then(() => {
      return Message.fetchMessages(otherUser);
    });
  },

  getLastMessage: (otherUser) => {
    return Message.getMessages(otherUser).sortBy(Message.getTime).reverse().first() || Map();
  },

  getMessages: (otherUser) => {
    return otherUser.get("messages") || Map();
  },

  getTime: (message) => {
    return moment(message.get("createdAt"));
  },

  body: (message) => {
    return message.get("body");
  },

  fromId: (message) => {
    return message.get("from");
  },

  fromUser: (message) => {
    return User.getUserById(Message.fromId(message));
  }
};

export default Message;

window.Message = Message;
