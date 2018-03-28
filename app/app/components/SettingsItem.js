import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const SettingsItem = function (props) {

    const icon = {
        name: props.icon,
        color: "#d4dde1",
        style: styles.icon
    };

    return (
        <ListItem
            title={ props.title }
            leftIcon={ icon }
            onSwitch={ props.onSwitch }
            switched={ props.value }
            titleStyle={ styles.title }
            hideChevron
            switchButton
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        paddingRight: 10
    },
    title: {
        color: "#2d3033"
    }
});

export default SettingsItem;
