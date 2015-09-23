import React from "react";
import lodash from "lodash";

import appState from "../../stores/app_state";
import LoaderComponent from "./loader_component";

export default function component(ChildComponent, paths, preloadFn) {
  return React.createClass({
    displayName: "component",

    getInitialState: function() {
      return {
        isResolved: false,
        hasError: false
      };
    },

    markResolved: function() {
      this.setState({isResolved: true});
    },

    markError: function(error) {
      console.error("Error rendering ", ChildComponent, ". While preloading encountered ", error);

      this.setState({hasError: true});
    },

    componentWillMount: function() {
      if(lodash.isFunction(preloadFn)) {
        preloadFn().error(this.markError).finally(this.markResolved);
      } else {
        this.markResolved();
      }
    },

    render: function() {
      if(this.state.isResolved) {
        if(!this.state.hasError) {
          var isComputed = (pitem) => /^computed/i.test(pitem);
          var hasComputed = (path) => lodash.any(path, isComputed);

          var computedPaths = lodash.pick(paths, (path) => hasComputed(path));
          var standardPaths = lodash.pick(paths, (path) => !hasComputed(path));

          var props = lodash.reduce(standardPaths, ((memo, path, key) => {
            memo[key] = appState.cursor(path);
            return memo;
          }), {});

          props = lodash.reduce(computedPaths, ((memo, path, key) => {
            path = path.map((pitem) => {
              if (isComputed(pitem)) {
                var keys = pitem.split(".").slice(2);
                var cursorKey = pitem.split(".")[1];
                var ppath = memo[cursorKey].deref();
                return lodash.isEmpty(keys) ? ppath : ppath.getIn(keys);
              } else {
                return pitem;
              }
            });
            memo[key] = appState.cursor(path);
            return memo;
          }), props);

          return <ChildComponent {...this.props} {...props}/>;
        } else {
          return false;
        }
      } else {
        return <LoaderComponent/>;
      }
    }
  });
}
