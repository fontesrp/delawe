import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Callout } from "react-native-maps";

import StatusIcon from "./StatusIcon";
import OrderInfo from "./OrderInfo";
import { titleize } from "../lib/util";

const Order = function (props) {

    return (
        <View style={ styles.container } >
            <View style={ styles.icon }>
                <StatusIcon status={ props.status } />
            </View>
            <View style={ styles.info }>
                <OrderInfo { ...props } />
            </View>
            <View style={ styles.status }>
                <Text style={ styles.statusText }>{ titleize(props.status) }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 350
    },
    icon: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        flex: 0.65,
        justifyContent: "center",
        alignItems: "center"
    },
    status: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: "#d4dde1",
        borderLeftWidth: 1
    },
    statusText: {
        color: "#2d3033",
        textAlign: "center"
    }
});

export default Order;
