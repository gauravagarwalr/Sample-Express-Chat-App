import lodash from "lodash";
import moment from "moment";
import Immutable, {Map} from "immutable";
import request from "superagent-bluebird-promise";

import appState from "./app_state";
import User from "./users_store";

var Message = {
  fetchMessages: (user) => {
    var userId = User.id(user);

    var params = {};

    var lastMessage = Message.getLastMessage(user);

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

  sendMessage: (user, messageBody) => {
    var userId = User.id(user);

    var params = {
      _csrf: appState.cursor(["state", "csrfToken"]).deref(),
      body: messageBody
    };

    return request.post(`/user/${userId}/messages`).send(params).promise().then(() => {
      return Message.fetchMessages(user);
    });
  },

  getLastMessage: (user) => {
    return Message.getMessages(user).sortBy(Message.getTime).reverse().first() || Map();
  },

  getMessages: (user) => {
    return user.get("messages") || Map();
  },

  getTime: (message) => {
    return moment(message.get("createdAt"));
  },

  id: (message) => {
    return message.get("_id");
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
