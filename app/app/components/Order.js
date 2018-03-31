import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Callout } from "react-native-maps";

import StatusIcon from "./StatusIcon";
import OrderInfo from "./OrderInfo";
import { snakeToTitle } from "../lib/util";

const Order = function (props) {

    return (
        <View style={ styles.container } >
            <View style={ styles.icon }>
                <StatusIcon status={ props.aasm_state } />
            </View>
            <View style={ styles.info }>
                <OrderInfo { ...props } />
            </View>
            <View style={ styles.status }>
                <Text style={ styles.statusText }>{ snakeToTitle(props.aasm_state) }</Text>
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
        paddingLeft: 10
    },
    status: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "flex-start",
        borderLeftColor: "#d4dde1",
        borderLeftWidth: 1,
        paddingLeft: 5,
        marginLeft:5
    },
    statusText: {
        color: "#2d3033",
        textAlign: "center"
    }
});

export default Order;
