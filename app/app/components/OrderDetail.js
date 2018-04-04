import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Icon, Badge } from "react-native-elements";

import { prettyDate, prettyTime, prettyNumber } from "../lib/util";

const OrderDetail = function (props) {

    if (props.type === "credits") {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>credits: </Text>
                <Badge value={ props.value } containerStyle={ styles.badge } />
            </View>
        );
    }

    let icon;
    let value;

    switch (props.type) {
    case "date":
        icon = "today";
        value = prettyDate(props.created_at);
        break;
    case "distance":
        icon = "pin-drop";
        value = props.distance.toFixed(1);
        break;
    case "time":
        icon = "access-time";
        value = prettyTime(props.created_at);
        break;
    }

    const unit = (props.type === "distance")
        ? " km"
        : null;

    return (
        <View style={ styles.container }>
            <Icon name={ icon } color="#d4dde1" />
            <Text style={ styles.text }>{ value }{ unit }</Text>
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
