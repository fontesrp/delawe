import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    StyleSheet,
    View
} from "react-native";
import { Header } from "react-native-elements";
import Notification from "react-native-in-app-notification";

import { ActionCreators } from "../actions";
import { toCamelCase } from "../lib/util";
import handleNotifications from "../lib/notifications";
import NotificationBody from "../components/NotificationBody";

class ScreenContainer extends Component {

    currentScreenTitle() {

        const route = this.props.navRoutes[0];
        const { index } = route;

        return route.routes[index].key;
    }

    showNotification(props) {

        const {
            title,
            message,
            onPress = () => {},
            icon = "notifications",
            vibrate = false
        } = props;

        this.notification.show({
            title,
            message,
            onPress,
            icon,
            vibrate
        });
    }

    componentWillReceiveProps(nextProps) {
        handleNotifications(this.props, nextProps, this.showNotification.bind(this));
    }

    render() {

        const { props } = this;

        const title = this.currentScreenTitle();

        const leftProps = {
            icon: "menu",
            color: "#2d3033",
            onPress: props.openDrawer,
            underlayColor: "rgba(0, 0, 0, 0.5)"
        };

        const centerProps = {
            style: styles.title,
            text: (title === "Home")
                ? "DELAWE"
                : title
        };

        return (
            <View style={ styles.container }>
                <Header
                    leftComponent={ leftProps }
                    centerComponent={ centerProps }
                    outerContainerStyles={ styles.outerContainer }
                />

                { React.cloneElement(props.children, { ...props }) }

                <Notification
                    ref={ ref => this.notification = ref }
                    notificationBodyComponent={ NotificationBody }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    outerContainer: {
        backgroundColor: "#aa4b41"
    },
    title: {
        color: "#2d3033",
        fontSize: 20,
        fontWeight: "bold"
    }
});

const mapStateToProps = function (state) {

    const props = {};

    Object.keys(state).forEach(function (type) {

        if (typeof state[type] !== "object" || Array.isArray(state[type])) {
            props[type] = state[type];
            return;
        }

        Object.keys(state[type]).forEach(function (prop) {
            props[`${type}${toCamelCase(prop)}`] = state[type][prop];
        });
    });

    return props;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenContainer);
