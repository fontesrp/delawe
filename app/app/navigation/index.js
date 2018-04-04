import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppNavigator from "../containers/AppNavigator";
import Login from "../containers/Login";

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const addListener = createReduxBoundAddListener("root");

class Nav extends Component {

    render() {

        const { props } = this;

        if (props.session.jwt === "") {
            return (
                <Login />
            );
        }

        return (
            <AppNavigator
                navigation={ addNavigationHelpers({
                    dispatch: props.dispatch,
                    state: props.nav,
                    addListener
                }) }
            />
        );
    }
}

const mapStateToProps = function (state) {
    return {
        nav: state.nav,
        session: state.session
    };
};

const AppWithNav = connect(mapStateToProps)(Nav);

export default AppWithNav;
export { navMiddleware };
