import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-elements";

import SettingsItem from "../components/SettingsItem";

class Settings extends Component {

    render() {

        const items = [
            {
                title: "Location",
                icon: "near-me",
                onSwitch: this.props.setTracking,
                value: this.props.userEnableLocation
            }
        ];

        return (
            <List containerStyle={ styles.container }>
                { items
                    .map((item, idx) => (
                        <SettingsItem key={ idx } { ...item } />
                    ))
                }
            </List>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Settings;
