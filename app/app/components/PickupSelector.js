import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { fullName } from "../lib/util";

const PickupSelector = function (props) {

    const iconProps = {
        name: "keyboard-arrow-down",
        color: "#2d3033",
        style: styles.icon
    };

    const { value, type } = props;

    let { name } = props;

    if (type === "courier" && value.first_name !== undefined) {
        name = fullName(value.first_name, value.last_name);
    } else if (type === "order" && value.id !== undefined) {
        name = String(value.id);
    }

    return (
        <Button
            title={ name }
            rightIcon={ iconProps }
            textStyle={ styles.text }
            containerViewStyle={ styles.container }
            borderRadius={ 10 }
            underlayColor="rgba(0, 0, 0, 0.5)"
            backgroundColor="white"
            color="#2d3033"
            onPress={ props.onPress }
            outline
        />
    );
};

const styles = StyleSheet.create({
    text: {
        width: "90%",
        textAlign: "center",
        paddingLeft: "10%"
    },
    icon: {
        width: "10%"
    },
    container: {
        marginLeft: 6,
        marginRight: 6,
        borderRadius: 10
    }
});

export default PickupSelector;
