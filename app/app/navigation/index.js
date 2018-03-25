import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppNavigator from "../containers/AppNavigator";

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const addListener = createReduxBoundAddListener("root");

class Nav extends React.Component {
    render() {
        return (
            <AppNavigator
                navigation={ addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener
                }) }
            />
        );
    }
}

const mapStateToProps = function (state) {
    return {
        nav: state.nav
    };
};

const AppWithNav = connect(mapStateToProps)(Nav);

export default AppWithNav;
export { navMiddleware };
