import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    StyleSheet
} from "react-native";
import { Header } from "react-native-elements";

import { ActionCreators } from "../actions";

class ScreenContainer extends Component {

    currentScreenTitle() {

        const route = this.props.navRoutes[0];
        const { index } = route;

        return route.routes[index].key;
    }

    render() {

        const title = this.currentScreenTitle();

        const leftProps = {
            icon: "menu",
            color: "#2d3033",
            onPress: this.props.openDrawer
        };

        const centerProps = {
            style: styles.title,
            text: (title === "Home")
                ? "DELWAE"
                : title
        };

        return (
            <View>
                <Header
                    leftComponent={leftProps}
                    centerComponent={centerProps}
                    outerContainerStyles={styles.outerContainer}
                />
                { React.cloneElement(this.props.children, { ...this.props }) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#aa4b41"
    },
    title: {
        color: "#2d3033",
        fontSize: 20,
        fontWeight: "bold"
    }
});

const titleize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const mapStateToProps = function (state) {

    const props = {};

    Object.keys(state).forEach(function (type) {
        Object.keys(state[type]).forEach(function (prop) {
            props[`${type}${titleize(prop)}`] = state[type][prop];
        });
    });

    return props;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenContainer);
