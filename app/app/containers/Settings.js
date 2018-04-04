import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { List, Button } from "react-native-elements";

import SettingsItem from "../components/SettingsItem";

class Settings extends Component {

    onLogout() {

        const { props } = this;

        // props.clearSync(props.logout);
        props.logout();
    }

    render() {

        const { props } = this;

        const items = [
            {
                title: "Location",
                icon: "near-me",
                onSwitch: props.setTracking,
                value: props.userEnableLocation
            }
        ];

        return (
            <View style={ styles.container }>
                <List>
                    { items
                        .map((item, idx) => (
                            <SettingsItem key={ idx } { ...item } />
                        ))
                    }
                </List>
                <Button
                    title="Logout"
                    onPress={ this.onLogout.bind(this) }
                    color="#2d3033"
                    backgroundColor="white"
                    containerViewStyle={ styles.logout }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: "#d4dde1"
    },
    logout: {
        marginTop: 20,
        marginLeft: 0,
        marginRight: 0
    }
});

export default Settings;
