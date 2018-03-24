import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Icon, Badge } from "react-native-elements";

const OrderDetail = function (props) {

    if (props.type === "credits") {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>credits: </Text>
                <Badge value={props.credits} containerStyle={styles.badge} />
            </View>
        );
    }

    let icon;

    switch (props.type) {
    case "date":
        icon = "today";
        break;
    case "distance":
        icon = "pin-drop";
        break;
    case "time":
        icon = "access-time";
        break;
    }

    return (
        <View style={styles.container}>
            <Icon name={icon} color="#d4dde1" />
            <Text style={styles.text}>{props[props.type]}{(props.type === "distance") ? " km" : null}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    badge: {
        backgroundColor: "#335252"
    },
    text: {
        color: "#2d3033"
    }
});

export default OrderDetail;
