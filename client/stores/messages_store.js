import lodash from "lodash";
import Immutable, {Map} from "immutable";
import request from "superagent-bluebird-promise";

import appState from "./app_state";

var Message = {
  getMessages: (otherUser) => {
    return otherUser.get("messages");
  }
};

export default Message;
