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

    render() {
        return (
            <View>
                <Header
                    leftComponent={{ icon: "menu", color: styles.menuIcon.color, onPress: this.props.openDrawer }}
                    centerComponent={{ text: "DELAWE", style: styles.title }}
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
        color: "#d4dde1",
        fontSize: 20,
        fontWeight: "bold"
    },
    menuIcon: {
        color: "#d4dde1"
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
