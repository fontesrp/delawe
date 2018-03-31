import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const PickupSelector = function (props) {

    const iconProps = {
        name: "arrow-drop-down",
        color: "black",
        style: styles.icon
    };

    return (
        <Button
            title={ props.name }
            rightIcon={ iconProps }
            textStyle={ styles.text }
            containerViewStyle={ styles.container }
            borderRadius={ 10 }
            underlayColor="rgba(0, 0, 0, 0.5)"
            backgroundColor="white"
            color="black"
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
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 10
    }
});

export default PickupSelector;
