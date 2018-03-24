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
                <Text>credits: </Text>
                <Badge value={props.credits} />
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
            <Text>{props[props.type]}{(props.type === "distance") ? " km" : null}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
});

export default OrderDetail;
